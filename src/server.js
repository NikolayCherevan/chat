const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Server = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
let connection = 0;
let userName = false;
io.on('connection', (socket) => {
    connection++;
    io.emit('chat connection', connection);
    io.emit('chat userStatus', userName)
    socket.on('disconnect', () => {
        connection--;
        io.emit('chat disconnect', connection);
        
    });

    socket.on('chat message', (user, msg) => {
        io.emit('chat message', user, msg)
    });



    socket.on('chat typing', (user, status) => {
        io.emit('chat typing', user, status)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
