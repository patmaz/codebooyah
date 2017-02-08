function routes(app) {
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/add', function(req, res){
        res.render('add');
    });
}

module.exports = routes;