const poll_ui = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Discussion Rooms For Upcoming Hacker Meal (4 PM PST)*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "🦠 *COVID-19 Impact*\n Discussions on impact of covid-19 pandemic."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Join"
				},
				"action_id": "covid_click"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
					"alt_text": "Michael Scott"
				},
				{
					"type": "image",
					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
					"alt_text": "Dwight Schrute"
				},
				{
					"type": "image",
					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
					"alt_text": "Pam Beasely"
				},
				{
					"type": "plain_text",
					"emoji": true,
					"text": "3 joined"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "🎮 *Video Game Suggestions*\n Suggest best video games to play during lockdown"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Join"
				},
				"value": "click_me_123"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_4.png",
					"alt_text": "Angela"
				},
				{
					"type": "image",
					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
					"alt_text": "Dwight Schrute"
				},
				{
					"type": "plain_text",
					"emoji": true,
					"text": "2 joined"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":ramen: *Quarantine Recipes*\n Share your favorite home recipes to try out during lockdown"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Join"
				},
				"value": "click_me_123"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "No votes"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"emoji": true,
						"text": "Add a suggestion"
					},
					"value": "click_me_123"
				}
			]
		}
	]
}