var axios = require('axios');
var config = require('../config');
var firebase = require('firebase');

firebase.initializeApp(config.firebase);
const intro = firebase.database().ref('intro/');

function routes(app) {
    app.get('/lorem/:words', function(req, res){
        axios.get('http://api.codebooyah.com/lorem/' + req.params.words, {
            headers: {
                'authorization': config.apikey
            }
        }).then(data => res.send(data.data));
    });

    app.get('/intro', function(req, res){
      intro.once('value')
        .then((snapshot) => {
          res.json(snapshot.val());
        })
        .catch((err) => res.status(500).json(err));
    });

    app.get('*', function(req, res){
        res.render('index');
    });
}

module.exports = routes;