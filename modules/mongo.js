var mongoose = require('mongoose');
var Entry = require('../models/entry');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

function mongo(app) {
    mongoose.connect('mongodb://localhost:27017/mongo');

    app.post('/mongo', urlencodedParser, function(req, res) {
        var entry = new Entry({
            title: req.body.title,
            body: req.body.body
        });

        entry.save(function(err) {
            if (err) throw err;
        });
    });

    app.put('/mongo/:title', urlencodedParser, function(req, res) {
        Entry.findOneAndUpdate(
            {
                title: req.params.title
            },
            {
                title: req.body.title,
                body: req.body.body
            }, function(err, entry) {
                if (err) throw err;
                res.redirect('/mongo');
            });
    });

    app.delete('/mongo/:title', function(req, res) {
        Entry.findOneAndRemove({title: req.params.title}, function(err) {
            if (err) throw err;
        });
    });

    app.get('/mongo', function(req, res) {
        Entry.find({}, function(err, entries) {
            if (err) throw err;
            res.send(entries);
        });
    });

    app.get('/mongo/:title', function(req, res) {
        Entry.find({title: req.params.title}, function(err, entry) {
            if (err) throw err;
            res.send(entry);
        });
    });


}

module.exports = mongo;