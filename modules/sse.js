"use strict";
const SSE = require('sse');

module.exports = function(app, state) {
    const openConnections = [];

    app.get('/sse', function(req, res) {

        req.socket.setTimeout(600000);

        res.writeHead(200, {
            "X-Accel-Buffering": "no",
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        openConnections.push(res);
        state.statsObserver.broadcast(true);

        console.log('+++ codebooyah connections: ' + openConnections.length);

        req.on("close", function() {
            let toRemove;
            for (let j = 0 ; j < openConnections.length ; j++) {
                if (openConnections[j] == res) {
                    toRemove = j;
                    break;
                }
            }
            openConnections.splice(toRemove, 1);
        });
    });

    const broadcast = (usersNumber) => {
      const data = {};
      data.usersNo = usersNumber;
      data.uptime = process.uptime();
      data.memo = process.memoryUsage().rss;
      data.platform = process.platform;

      openConnections.forEach(function(res) {
        res.write('data:' + JSON.stringify(data) + '\n\n');
      });
    };
    setInterval(() => {
        if (openConnections.length > 0) {
            broadcast(openConnections.length);
        }
        state.connectionsObserver.broadcast(openConnections.length);
    }, 1000*3);
};