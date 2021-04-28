const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Server = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    debugger
    res.sendFile(__dirname + '/index.html');
});
let connection = 0;

io.on('connection', (socket) => {
    connection++;
    var connectionID = socket.id;

    io.emit('chat connection', connection);

 
    socket.on('disconnect', () => {
        var disconnectionID= socket.id;

        connection--;
        io.emit('chat disconnect', connection,disconnectionID);
   
        
    });

    socket.on('chat message', (user, msg) => {
        io.emit('chat message', user, msg)
    });

    socket.on('chat userStatus', (user,status) => {
        io.emit('chat userStatus', user,status)
        io.emit('user plus', user,status, connectionID);
    });

    socket.on('chat typing', (user, status) => {
        io.emit('chat typing', user, status)
    });
});

server.listen(3001, () => {
    console.log('listening on *:3000');
});
