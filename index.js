// ############### web server by express
var express = require("express");
var app = express();
var http = require('http').Server(app);
// var https = require('https');
// var fs = require('fs');
const websocket = require('ws');
const WebSocketServer = websocket.Server;

//modules
var mongo = require('./modules/mongo');
var routes = require('./modules/routes');
var chat = require('./modules/chat');

//static files
app.use('/static', express.static(__dirname + "/public"));

// EJS engine
app.set("view engine", "ejs");

// modules
// mind the sequence because of react router
mongo(app);
routes(app);
chat(http);

//environmental variables on server or 3000
http.listen(8000);

// var options = {
//   key: fs.readFileSync('./ssl/key.pem'),
//   cert: fs.readFileSync('./ssl/cert.pem')
// };

// var sslSrv = https.createServer(options, app).listen(8000);

// var wss = new WebSocketServer({server: http});

// // Broadcast to all.
// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === websocket.OPEN) {
//       client.send(data);
//     }
//   });
// };

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     // Broadcast to everyone else.
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === websocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });
// });