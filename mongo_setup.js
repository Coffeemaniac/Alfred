var mongoose = require('mongoose');


//Set up default mongoose connection
const dbPath = "mongodb://3.81.67.70:27017/test-db";

mongoose.connect(dbPath, { useNewUrlParser: true , useCreateIndex: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});


module.exports = mongoose;