const express = require("express");
const router = express.Router();

// Event Model
const Event = require("../../models/event");

// display events
router.get("/", (req, res) => {
  Event.find().then(events => res.json(events));
});

// add event
router.post("/", (req, res) => {
  const newEvent = new Event({
    eventname: req.body.eventname,
    eventplace: req.body.eventplace,
    eventdate: req.body.eventdate,
    eventprice: req.body.eventprice
  });
  newEvent.save().then(event => res.json(event));
});

// update event
router.put("/:id", (req, res) => {
  const updateEvent = req.body;
  Event.findOneAndUpdate({ _id: req.params.id }, { $set: { ...updateEvent } })
    .then(data => res.send({ success: true }))
    .catch(err => res.send({ success: false }));
});

// delete event
router.delete("/:id", (req, res) => {
  Event.findOneAndDelete(req.params.id).then(event =>
    event
      .remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }))
  );
});

module.exports = router;