var http = require('http');
var SSE = require('sse');
var https = require('https');

const URL = 'http://api.open-notify.org/iss-now.json?callback=?';

module.exports = function(server) {
    let sse = new SSE(server);
    let clients = [];

    sse.on('connection', function(stream) {
        clients.push(stream);
        stream.on('close', function() {
            clients.splice(clients.indexOf(stream), 1);
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
                        clients.forEach((stream) => {
                            stream.send(JSON.stringify(data));
                        });
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
        if (clients.length > 0) broadcast(clients.length);
    }, 10000);
}