"use strict";
const websocket = require('ws');

module.exports = function(server) {
    var wss = new websocket.Server({ server: server, path: '/video' });

    // Broadcast to all.
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === websocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(data) {
            // Broadcast to everyone else.
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === websocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
}
