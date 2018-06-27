'use strict';

// ############### web server by express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
let server;

if (process.env.HTTPS === 'yes') {
  const fs = require('fs');
  const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
  };
  server = require('https').createServer(options, app);
} else {
  server = require('http').Server(app);
}

app.use(bodyParser.json({ type: '*/*', limit: '10000kb' }));

//modules
const routes = require('./modules/routes');
const chat = require('./modules/chat');
const chatVideo = require('./modules/chatVideo');
const sse = require('./modules/sse');

//static files
app.use(
  '/static',
  express.static(path.join(__dirname, '/client/build/static'), {
    maxAge: 86400000,
  }),
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
