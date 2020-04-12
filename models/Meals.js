const mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var MealsSchema = Schema({
  mid: String,
  timestamp: Number,
  dateString: String,
  GD_list: [String],
});

MealsSchema.index({
  mid: 1
}, {
  unique: true,
})

var Meals = mongoose.model('Meals', MealsSchema);
module.exports = Meals;