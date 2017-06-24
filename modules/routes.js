var axios = require('axios');
var config = require('../config');

function routes(app) {
    app.get('/lorem/:words', function(req, res){
        axios.get('http://api.codebooyah.com/lorem/' + req.params.words, {
            headers: {
                'authorization': config.apikey
            }
        }).then(data => res.send(data.data));
    });

    app.get('*', function(req, res){
        res.render('index');
    });
}

module.exports = routes;