'use strict';

// ############### web server by express
var express = require('express');
var app = express();
var helmet = require('helmet');
var morgan = require('morgan');
var path = require('path');

if (process.env.HTTPS === 'yes') {
  var fs = require('fs');
  var options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
  };
  var server = require('https').createServer(options, app);
} else {
  var server = require('http').Server(app);
}

//modules
var routes = require('./modules/routes');
var chat = require('./modules/chat');
var chatVideo = require('./modules/chatVideo');
var sse = require('./modules/sse');

//static files
app.use(
  '/static',
  express.static(path.join(__dirname, '/client/build/static'), { maxAge: 86400000 }),
);
app.use(
  '/oldstatic',
  express.static(path.join(__dirname, '/public'), { maxAge: 86400000 }),
);

// security
app.use(helmet());

//logs
app.use(morgan('combined'));

// modules
// mind the sequence because of react router
sse(app);
chat(server);
routes(app);
chatVideo(server);

server.listen(8000);
console.log('+++ codeboohay +++ 8000');
