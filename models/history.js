var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
    term: String,
    when: Date
});

var History = mongoose.model('History', historySchema);

module.exports = History;