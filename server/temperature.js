var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/diasroom-watcher');

module.exports = db.model('temperature', new mongoose.Schema({
  temperature: Number,
  datetime: String
}));
