const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventname: {
    type: String,
    required: true
  },
  eventplace: {
    type: String,
    required: true
  },
  eventdate: {
    type: String,
    required: true
  },
  eventprice: {
    type: Number,
    required: true
  }
  // avatar: {
  // 	type: String
  // }
});

const Event = mongoose.model("events", EventSchema);

module.exports = Event;
