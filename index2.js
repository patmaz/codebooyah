var fs = require('fs');
const websocket = require('ws');
const WebSocketServer = websocket.Server;
var https = require('https');


var options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

var sslSrv = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8001);

var wss = new WebSocketServer({server: sslSrv});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === websocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
	console.log('con');
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === websocket.OPEN) {
        client.send(data);
      }
    });
  });
});