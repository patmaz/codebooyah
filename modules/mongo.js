var mongoose = require('mongoose');
var Entry = require('../models/entry');

function mongo(app) {
    mongoose.connect('mongodb://localhost:27017/mongo');

    app.post('/mongoadd', function(req, res) {
        var entry = new Entry({
            title: 'test title',
            body: 'test body',
            date: {
                type: Date,
                default: Date.now
            }
        });

        entry.save(function(err) {
            if (err) throw err;
        });
    });

    app.get('/mongo', function(req, res) {
        Entry.find({}, function(err, entries) {
            if (err) throw err;
            res.send(entries);
        });
    });
}

module.exports = mongo;