const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dataofcreation: {
    type: Date,
    default: Date.now()
  },
  events:{
    type:Array
  },
  privelege:{
    type:String,
    required:false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
