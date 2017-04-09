const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  eid: Number,
  host: Number,
  startTime: Date,
  endTime: Date,
  attendees: [ Number ],
  location: String,
  title: String,
  description: String,
  coverimage: String,
  tags: [ String ],
  visibility: [ Number ]
});

module.exports = mongoose.model('Event', eventSchema);
