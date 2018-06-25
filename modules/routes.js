var axios = require('axios');
var config = require('../config');
var firebase = require('firebase');
var path = require('path');
var appDir = path.dirname(require.main.filename);

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

    app.get('/api/intro', function(req, res){
      intro.once('value')
        .then((snapshot) => {
          res.json(snapshot.val());
        })
        .catch((err) => res.status(500).json(err));
    });

    app.get('/old/', function(req, res){
      res.sendFile(path.join(appDir + '/public/index.html'));
    });

    app.get('/', (reg, res) => {
      res.sendFile(path.join(appDir + '/client/build/index.html'));
    })
}

module.exports = routes;