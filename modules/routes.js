function routes(app) {
    app.get('*', function(req, res){
        res.render('index');
    });
}

module.exports = routes;