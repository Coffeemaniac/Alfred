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

  exports.createGDsection = createGDsection;
  exports.gdSectionPreviewCreator = gdSectionPreviewCreator;
  exports.mealCreatorMeta = mealCreatorMeta;
  exports.getDateString = getDateString;
  exports.addGDPreview = addGDPreview; 
  exports.createDivider = createDivider;



