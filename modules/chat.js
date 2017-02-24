var socketio = require('socket.io');

module.exports = function(http) {
    const io = socketio(http);

    const chatTxt = io.of('/chat');

    let usersNumber = 0;

    chatTxt.on('connection', (client) => {
        client.on('join', (data) => {
            client.emit('messages', 'Welcome to code booyah! text chat');
            ++usersNumber;
            chatTxt.emit('messages', `${usersNumber} users online`);
        });

        client.on('messages', (data) => {
           client.emit('messages', data);
           client.broadcast.emit('messages', data);
        });

        client.on('disconnect', (data) => {
            --usersNumber;
            chatTxt.emit('messages', `${usersNumber} users online`);
        })
    });
}