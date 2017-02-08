var mongoose = require('mongoose');
var Entry = require('../models/entry');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

function mongo(app) {
    mongoose.connect('mongodb://localhost:27017/mongo');

    app.post('/mongoadd', urlencodedParser, function(req, res) {
        var entry = new Entry({
            title: req.body.title,
            body: req.body.body
        });

        entry.save(function(err) {
            if (err) throw err;
        });

        res.redirect('/mongo');
    });

    app.get('/mongo', function(req, res) {
        Entry.find({}, function(err, entries) {
            if (err) throw err;
            res.send(entries);
        });
    });
}

module.exports = mongo;