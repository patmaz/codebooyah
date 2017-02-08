// ############### web server by express
var express = require("express");
var app = express();
var http = require('http').Server(app);

//modules
var routes = require('./modules/routes');
var mongo = require('./modules/mongo');

//static files
app.use('/static', express.static(__dirname + "/public"));

// EJS engine
app.set("view engine", "ejs");

//controllers
routes(app);
mongo(app);

//environmental variables on server or 3000
http.listen(8000);