// Bing in environment secrets through dotenv
var config = require('./config');
var session = require('express-session');
var mongoSetup = require('./mongo_setup');
var mongoose = require('mongoose');


// Use the request module to make HTTP requests from Nodee
const request = require('request');
const https = require('https');

var Meals = require("./models/Meals")
var GD = require("./models/groupDiscussions") 



// Run the express app
const express = require('express');
var bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());


var crypto = require('crypto');
const { exec } = require('child_process');

var utils = require('./utils/util_functions')




app.get('/', (req, res) => {

    // Step 1: 
    // Check if the code parameter is in the url 
    // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
    // if not, the user needs to be redirected to Zoom OAuth to authorize

    if (req.query.code) {

        // Step 3: 
        // Request an access token using the auth code

        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + config.redirectURL;

        request.post(url, (error, response, body) => {

            // Parse response to JSON
            body = JSON.parse(body);

            // Logs your access and refresh tokens in the browser
            console.log(`auth code: ${req.query.code}`)
            console.log(`access_token: ${body.access_token}`);
            console.log(`refresh_token: ${body.refresh_token}`);


            if (body.access_token) {
            	access_token = body.access_token;
                // Step 4:
                // We can now use the access token to authenticate API calls

                // Send a request to get your user information using the /me context
                // The `/me` context restricts an API call to the user the token belongs to
                // This helps make calls to user-specific endpoints instead of storing the userID
                // create_meeting("gautamgsabhahit@gmail.com",access_token,res);
                request.get('https://api.zoom.us/v2/users/me', (error, response, body) => {
                    if (error) {
                        console.log('API Response Error: ', error)
                    } else {
                        body = JSON.parse(body);
                        // Display response in console
                        console.log('API call ', body);
                        // Display response in browser
                        var JSONResponse = '<pre><code>' + JSON.stringify(body, null, 2) + '</code></pre>'
                        // console.log(body);
                        // res.send(access_token);
                        user_insert_log = utils.add_user(body.pmi,body.email,body.email,body.first_name,access_token,body.first_name,body.last_name,body.pic_url)
                        res.send("<h2></")
                    }
                }).auth(null, null, true, body.access_token);
                

            } else {
                // Handle errors, something's gone wrong!
            }

        }).auth(config.clientID, config.clientSecret);

        return;

    }

    // Step 2: 
    // If no authorization code is available, redirect to Zoom OAuth to authorize
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + config.clientID + '&redirect_uri=' + config.redirectURL)
})







const HOOKED = "pioneerhack12";

app.get('/create_meeting', (req, res) => {
	console.log(req.query.email_id);
	user_info = utils.fetch_user_info_from_email(req.query.email_id)
	console.log(typeof user_info)
	meeting_info = utils.create_meeting(user_info["email"], user_info["zoom_access_token"])

	if (meeting_info.code == 123){
		new_access_token = utils.refresh_token(user_info["zoom_access_token"])
		console.log(new_access_token)
		utils.update_access_token(user_info["email"],new_access_token)
		meeting_info = utils.create_meeting(user_info["email"], user_info["zoom_access_token"])
		console.log("new meeting "+meeting_info)
	}

	res.send(`<style>
				@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap');@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');html {color: #232333;font-family: 'Open Sans', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}h2 {font-weight: 700;font-size: 24px;}h4 {font-weight: 600;font-size: 14px;}.container {margin: 24px auto;padding: 16px;max-width: 720px;}.info {display: flex;align-items: center;}.info>div>span, .info>div>p {font-weight: 400;font-size: 13px;color: #747487;line-height: 16px;}.info>div>span::before {content: "👋";}.info>div>h2 {padding: 8px 0 6px;margin: 0;}.info>div>p {padding: 0;margin: 0;}.info>img {background: #747487;height: 96px;width: 96px;border-radius: 31.68px;overflow: hidden;margin: 0 20px 0 0;}.response {margin: 32px 0;display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;}.response>a {text-decoration: none;color: #2D8CFF;font-size: 14px;}.response>pre {overflow-x: scroll;background: #f6f7f9;padding: 1.2em 1.4em;border-radius: 10.56px;width: 100%;box-sizing: border-box;}
			</style>
			<div class="container">
				<div class="info">
					<img src="`+user_info.zoom_pic_url+`" alt="User photo" />
					<div>
					    <span>Hello There!</span>
					    <h2>`+user_info.zoom_first_name+" "+user_info.zoom_last_name+`</h2>
					</div>
				</div>
				<div class="response">
					<h4>Your meeting link has been created: <a href=`+meeting_info.start_url+`>teeny tiny link<a/> and password `+meeting_info.password+`<h4/>
					<h4>Alfred will now share your details with other team mates you'll join you for lunch<h4/>
				</div>
			</div>`);
})

app.get('/send_message', (req, res) => {
	message = req.query.message;
	console.log(req.query.email_id);
	user_info = utils.fetch_user_info_from_email(req.query.email_id)
	message_info = utils.send_message(user_info["zoom_access_token"], message,req.query.email_id)
    
	if (message_info.code == 123){
		new_access_token = utils.refresh_token(user_info["zoom_access_token"])
		console.log(new_access_token)
		utils.update_access_token(user_info["email"],new_access_token)
		message_info = utils.send_message(user_info["zoom_access_token"], message, req.query.email_id)
		console.log("new message sent  "+message_info)
	}

	res.send(message+"sent");
})




app.post('/timetoascendpepe', (req, res) => {
    console.log("hook", req.body);
    let signature = "sha1=" + crypto.createHmac('sha1', HOOKED).update(JSON.stringify(req.body)).digest('hex');
    const isAllowed = req.headers['x-hub-signature'] === signature;

    if (isAllowed) {
        try {
            exec('cd /home/ec2-user/pioneerHack && sudo git pull');
        } catch (error) {
            console.log(error)
        }
    }

    return;
});





app.listen(4000, () => console.log(`Zoom Hello World app listening at PORT: 4000`))


