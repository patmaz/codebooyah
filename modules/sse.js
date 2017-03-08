"use strict";
var http = require('http');
var SSE = require('sse');

const URL = 'http://api.open-notify.org/iss-now.json?callback=?';

module.exports = function(app) {
    let openConnections = [];

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

        req.on("close", function() {
            let toRemove;
            for (let j = 0 ; j < openConnections.length ; j++) {
                if (openConnections[j] == res) {
                    toRemove = j;
                    break;
                }
            }
            openConnections.splice(toRemove, 1);
            console.log(openConnections.length);
        });
    });

    var broadcast = (usersNumber) => {
        http.get(URL, (res) => {
            let json = '';

            res.on('data', (chunk) => {
                json += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        json = json.substring(2, json.length-1);
                        let data = [JSON.parse(json).iss_position];
                        data.push(usersNumber);
                        data.push(process.uptime());
                        openConnections.forEach(function(res) {
                            res.write('data:' + JSON.stringify(data) + '\n\n');
                        });
                        console.log('data:' + JSON.stringify(data) + '\n\n');
                    } catch (err) {
                        console.log('Error parsing JSON!');
                    }
                } else {
                    console.log('Status:', res.statusCode);
                }
            });
        }).on('error', (err) => {
            console.error(err);
        });
    }
    setInterval(() => {
        if (openConnections.length > 0) broadcast(openConnections.length);
    }, 10000);
}