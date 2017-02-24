// ############### web server by express
var express = require("express");
var app = express();
if (process.env.HTTPS === 'yes') {
    var fs = require('fs');
    var options = {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    };
    var server = require('https').createServer(options, app);
} else {
    var server = require('http').Server(app);
}


//modules
var mongo = require('./modules/mongo');
var routes = require('./modules/routes');
var chat = require('./modules/chat');
var chatVideo = require('./modules/chatVideo');

//static files
app.use('/static', express.static(__dirname + "/public"));

// EJS engine
app.set("view engine", "ejs");

// modules
// mind the sequence because of react router
chat(server);
mongo(app);
routes(app);
chatVideo(server);

server.listen(8000);