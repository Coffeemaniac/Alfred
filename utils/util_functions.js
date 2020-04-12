var Users = require("../models/Users")
var Meals = require("../models/Meals")
var GDs = require("../models/groupDiscussions")
const request = require('request');
const https = require('https');
var config = require('../config');

module.exports = {
	add_user: async function(uid,email_id,purl,name,is_admin){
				console.log('adding user'+email_id);
				try{
					return await Users.create({ 
			      		  uid: uid,
						  email: email_id,
			  			  purl: purl,
						  name: first_name,
						  is_admin: is_admin, 
						  zoom_access_token: "",
						  zoom_first_name: "",
						  zoom_last_name: "",
						  zoom_pic_url:"",
						  zoom_id: ""
						} );
				}catch(err){
					console.log(err);
				}
			},
	add_meals: async function(date,meal_id){
				console.log('adding meal'+meal_id);
				try{
					return await Meals.create({ 
			      			mid: mid,
			      			dateString: date
						} );
				}catch(err){
					console.log(err);
				}
			},

	update_access_token: async function(email_id,access_token){
			try{
				    return Users.findOneAndUpdate(
				      { uid: email_id },
				      { $setOnInsert: { 
							  zoom_access_token: access_token
							} 
						},
				      { upsert: true, new: true, rawResult: true }
				    );
				}catch(err){
					console.log(err)
				}
			},
	update_user: async function(uid,email_id,purl,name,access_token,first_name,last_name,pic_url){
			try{
				    return Users.findOneAndUpdate(
				      { uid: email_id },
				      { $setOnInsert: { 
				      		  uid: uid,
							  email: email_id,
				  			  purl: purl,
							  name: first_name,
							  zoom_access_token: access_token,
							  zoom_first_name: first_name,
							  zoom_last_name: last_name,
							  zoom_pic_url: pic_url
							} 
						},
				      { upsert: true, new: true, rawResult: true }
				    );
				}catch(err){
					console.log(err)
				}
			},

	fetch_user_info_from_email:  async function(email_id){
			try{
					Users.find({email:email_id})
					.then((doc)=>{
						console.log(typeof doc)
					    console.log(doc[0]);
					    return doc[0];
					 })
					.catch((err)=>{
					    console.log(err);
					    return err;
					});
				}catch(err){
					console.log(err)
				}
			},

	create_meeting: async function(email_id,access_token){

				var options = {
					method: 'POST',
					url: 'https://api.zoom.us/v2/users/'+email_id+'/meetings',
					headers: {
						'content-type': 'application/json',
						authorization: 'Bearer '+access_token
					},
					body: {
						"topic": "Test meeting",
						"type": "1",
						"duration": "60",
						"timezone": "string",
						"agenda": "string",
						"registrants_email_notification": "true",
						"settings": {
							"host_video": "false",
							"participant_video": "true",
							"waiting_room": "false",
							"join_before_host": "true",
						}
					},
					json: true
				};

				try{
					request(options, function (error, response, body) {
					  if (error) return error;

					  console.log(body);
					  console.log(body.start_url);
					  return body
					});
				}catch(err){
					 console.log("err"+err);
				}
				
			},

	refresh_token: async function(access_token){
		let url = 'https://zoom.us/oauth/token?grant_type=refresh_token&code=' + access_token;
		try{
			request.post(url, (error, response, body) => {

	            // Parse response to JSON
	            body = JSON.parse(body);


	            if (body.access_token) {
	            	console.log("new code got");
	                return access_token;

	            } else {
	                // Handle errors, something's gone wrong!
	            }

	        }).auth(config.clientID, config.clientSecret);
	    }catch(err){
	    	console.log("errrrr"+err)
	    }

	}
}