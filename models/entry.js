var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema ({
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;