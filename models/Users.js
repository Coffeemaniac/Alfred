const mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = Schema({
  uid: String,
  email: String,
  name: String,
  pUrl: String,
  zoom_access_token: String,
  zoom_first_name: String,
  zoom_last_name: String,
  zoom_pic_url: String,
  is_admin: Boolean,
  zoom_id: String
});

UserSchema.index({
  uid: 1
}, {
  unique: true,
})

var Users = mongoose.model('Users', UserSchema);
module.exports = Users;
