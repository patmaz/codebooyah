var WebSocketServer = require('websocket').server;

module.exports = function(app) {
    wsServer = new WebSocketServer({
        httpServer: app
    });

    var count = 0;
    var clients = {};

    wsServer.on('request', function(req){
        var connection = req.accept('echo-protocol', req.origin);
        var id = count++;
        clients[id] = connection;
        console.log((new Date()) + ' Connection accepted [' + id + ']');
        for(var i in clients){
            clients[i].sendUTF('no of users: ' + count);
        }

        connection.on('message', function(message) {

            var msgString = message.utf8Data;

            for(var i in clients){
                clients[i].sendUTF(msgString);
            }
        });

        connection.on('close', function(reasonCode, description) {
            delete clients[id];
            count -= 1;
            for(var i in clients){
                clients[i].sendUTF('no of users: ' + count);
            }
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });
}