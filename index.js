// ############### web server by express
var express = require("express");
var app = express();
var http = require('http').Server(app);
var webpackDevHelper = require('./index.dev.js');

//modules
var mongo = require('./modules/mongo');
var routes = require('./modules/routes');
var chat = require('./modules/chat');

//static files
if (process.env.NODE_ENV === 'development') {
    webpackDevHelper.useWebpackMiddleware(app);
} else {
    app.use('/static', express.static(__dirname + "/public"));
}

// EJS engine
app.set("view engine", "ejs");

// modules
// mind the sequence because of react router
mongo(app);
routes(app);
chat(http);

//environmental variables on server or 3000
http.listen(8000);