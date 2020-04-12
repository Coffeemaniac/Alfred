const { App, LogLevel } = require('@slack/bolt');
const gd_temp = require('./gd_template');
var _ = require('lodash');
const knex = require('knex');

const token = "xoxb-1074284586432-1056103360293-jJKE4XqDGlBqwdVN9R0oxIUn";

const app = new App({
  token: "xoxb-1074284586432-1056103360293-jJKE4XqDGlBqwdVN9R0oxIUn",
  signingSecret: "db3b4b907035a3638451c1f89d00572e",
  logLevel: LogLevel.DEBUG
});


app.message('familymeal', async ({ message, say }) => {
  let dateString = getDateString();
  let mealCreatorComponent = mealCreatorMeta("meal#007", dateString);
  await say(mealCreatorComponent);
});


app.message('userinfo', async ({ message, say }) => {
 

  const result = await app.client.users.list({
    token: token
  });

  const userResults = result.members;
  let users = [];
  userResults.forEach(u => {
    users.push({
      id: u.id,
      name: u.name,
      email: u.profile.email,
      pUrl: u.profile.image_32,
      is_admin: u.is_admin
    });
  });
  await say(JSON.stringify(users));
});



app.message('discuss', async ({ message, say }) => {
  console.log("discuss triggered");
  let resp = { blocks: [] };
  let divider = createDivider();
  resp.blocks.push({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Discussion rooms for upcoming hacker meal (8 PM PST)*"
    }
  }
  );
  resp.blocks.push(divider);
  for (let i = 0; i < 4; i++) {
    let dSection = createGDsection("Hackathon Tips & Tricks", "Discussion on how to churn out code during a hackathon", `gd${i}`);
    resp.blocks = _.concat(resp.blocks, dSection, divider);
  }
  await say(resp);
});


function createGDsection(title, description, block_id) {
  return ([
    {
      "type": "section",
      "block_id": `${block_id}`,
      "text": {
        "type": "mrkdwn",
        "text": `*💻 ${title}*\n ${description}`
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Join"
        },
        "action_id": "join_btn_click"
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "plain_text",
          "text": "0 Joined"
        }
      ]
    }
  ]);
}

function gdSectionPreviewCreator(title, description) {
  return ([{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `*${title}* \n ${description}`
    }
  },
  {
    "type": "divider",
    "block_id": "gd_end_div"
  }]);
}

function mealCreatorMeta(block_id, dateString) {
  return ({
    blocks: [
      {
        "type": "divider",
        "block_id": `${block_id}`
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "🍕 *Create a Remote Team Dinner*"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "📅 Pick a date for remote lunch"
        },
        "accessory": {
          "type": "datepicker",
          "initial_date": `${dateString}`, //"YYYY-MM-DD",
          "placeholder": {
            "type": "plain_text",
            "text": "Select a date",
            "emoji": true
          }
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "🕒 Pick time of the day for Remote Meal"
        },
        "accessory": {
          "type": "static_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Ex: 8:00 PM",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Choice 1",
                "emoji": true
              },
              "value": "value-0"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Choice 2",
                "emoji": true
              },
              "value": "value-1"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Choice 3",
                "emoji": true
              },
              "value": "value-2"
            }
          ]
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Add a group discussion topic*"
        }
      },
      {
        "type": "divider",
        "block_id": "gd_end_div"
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Add a discussion topic",
              "emoji": true
            },
            "action_id": "add_discussion_click",
            "value": "click_me_123"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "."
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Invite",
            "emoji": true
          },
          "action_id": "invite",
          "value": "click_me_123"
        }
      }
    ]
  })
}

app.action('join_btn_click', async ({ body, ack, respond }) => {
  await ack();
  let blocks = _.cloneDeep(body.message.blocks);
  let sectionIndex = _.findIndex(blocks, function (s) { return s.block_id === body.actions[0].block_id })
  let cIndex = sectionIndex + 1;
  blocks[cIndex].elements[0].text = "1 Joined";
  console.log(blocks[sectionIndex + 1].elements[0]);
  // console.log(JSON.stringify(blocks));
  await respond({ blocks, replace_original: true });

});

app.action('add_discussion_click', async ({ body, ack, respond }) => {
  await ack();
  console.log(body.actions[0].block_id);
  let metaData = JSON.stringify({ "channelID": body.channel.id, "ts": body.message.ts, "blocks": body.message.blocks });
  const modalResult = await app.client.views.open({
    token: token,
    trigger_id: body.trigger_id,
    view: {
      "type": "modal",
      "callback_id": 'view_modal',
      "private_metadata": metaData,
      "title": {
        "type": "plain_text",
        "text": "My App",
        "emoji": true
      },
      "submit": {
        "type": "plain_text",
        "text": "Create",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "blocks": [
        {
          "type": "input",
          "block_id": "modal_title",
          "element": {
            "action_id": "title",
            "type": "plain_text_input"
          },
          "label": {
            "type": "plain_text",
            "text": "Group Discussion Topic",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "desc",
          "element": {
            "type": "plain_text_input",
            "action_id": "modal_description",
            "multiline": true
          },
          "label": {
            "type": "plain_text",
            "text": "Topic Description",
            "emoji": true
          }
        }
      ]
    }
  });
});

app.view('view_modal', async ({ ack, body, view, context }) => {
  await ack();

  let privateMetadata = JSON.parse(view.private_metadata);
  let submissionData = view.state.values;
  let blocks = privateMetadata.blocks;
  let gdTitle = submissionData.modal_title.title.value;
  let gdDesc = submissionData.desc.modal_description.value;


  let gdPreview = gdSectionPreviewCreator(gdTitle, gdDesc);
  let updatedBlocks = addGDPreview(blocks, gdPreview);


  const resp = await app.client.chat.update({
    token: token,
    channel: privateMetadata.channelID,
    ts: privateMetadata.ts,
    blocks: updatedBlocks,
    as_user: true
  });

});

function getDateString() {
  let current_datetime = new Date()
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + (current_datetime.getDate() + 1);
  return formatted_date
}

function addGDPreview(blocks, gdPreviewSection) {
  let gdEndIndex = _.findIndex(blocks, function (s) { return s.block_id === "gd_end_div" });

  let takeBlock = _.takeRight(blocks, 2); /* add discussion and invite block */
  console.log("GD end div", gdEndIndex);

  let slicedBlocks = _.slice(blocks, 0, gdEndIndex);
  let newBlocks = _.concat(slicedBlocks, gdPreviewSection, takeBlock);
  return newBlocks;
}

function createDivider() {
  return ({
    "type": "divider"
  });
}


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();