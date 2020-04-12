const mongoose = require("mongoose");
//Define a schema
var Schema = mongoose.Schema;

var GDSChema = Schema({
  gid: String,
  mid: String,
  title: String,
  description: [String],
  participants: [String],
  host_uid: String
});

GDSChema.index({
		gid: 1
	}, {
		unique: true,
})

var groupDiscussions = mongoose.model('groupDiscussions', GDSChema);
module.exports = groupDiscussions;

