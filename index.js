const { App, LogLevel } = require('@slack/bolt');
const { init } = require('./config.js');
var _ = require('lodash');
const Utils = require('./Utils.js');
const ggsUtils = require('./utils/util_functions')
var mongoSetup = require('./mongo_setup');
var mongoose = require('mongoose');

const app = init();


/* When this listener gets invoked, create create a random MID and save it in DB */
app.message('familymeal', async ({ message, say }) => {
  let dateString = Utils.getDateString();
  let mid = Math.floor(new Date() / 1000)
  ggsUtils.add_meal(dateString,mid);
  let mealCreatorComponent = Utils.mealCreatorMeta(mid, dateString);
  
  await say(mealCreatorComponent);
});

app.message('discuss', async ({ message, say }) => {
  console.log("discuss triggered");
  let resp = { blocks: [] };
  let divider = Utils.createDivider();
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
    let dSection = Utils.createGDsection("Hackathon Tips & Tricks", "Discussion on how to churn out code during a hackathon", `gd${i}`);
    resp.blocks = _.concat(resp.blocks, dSection, divider);
  }
  await say(resp);
});


/* get user info list here ,*/ 

app.message('userinfo', async ({ message, say, context }) => {
 
  const result = await app.client.users.list({
    token: context.botToken
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
    ggsUtils.add_user(u.id,u.name,u.profile.email,u.profile.image_32,u.is_admin)
  });
  await say(JSON.stringify(users));
});


/* You'll be able to find user who clicked and the group discussion id here*/
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


/* This function is called when user clicks on the Add discussion button */
app.action('add_discussion_click', async ({ body, ack, respond, context }) => {
  await ack();
  console.log(body.actions[0].block_id);
  let metaData = JSON.stringify({ "channelID": body.channel.id, "ts": body.message.ts, "blocks": body.message.blocks });
  const modalResult = await app.client.views.open({
    token: context.botToken,
    trigger_id: body.trigger_id,
    view: Utils.getModalView()
  });
});


/* Create and add group discussion object here {You'll find the user input for topic and topic description}*/ 
app.view('view_modal', async ({ ack, body, view, context }) => {
  await ack();

  let privateMetadata = JSON.parse(view.private_metadata);
  let submissionData = view.state.values; /* Contains values of user input to modal */
  let blocks = privateMetadata.blocks;
  let gdTitle = submissionData.modal_title.title.value;
  let gdDesc = submissionData.desc.modal_description.value;

  let mealID = blocks[1].block_id;
  console.log(mealID);


  let gdPreview = Utils.gdSectionPreviewCreator(gdTitle, gdDesc);
  let updatedBlocks = Utils.addGDPreview(blocks, gdPreview);


  const resp = await app.client.chat.update({
    token: context.botToken,
    channel: privateMetadata.channelID,
    ts: privateMetadata.ts,
    blocks: updatedBlocks,
    as_user: true
  });
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();



/* bruvvvv */