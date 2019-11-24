var io = require('socket.io')(3000);

io.sockets.on('connection', function(socket) {
    console.log('CONNECTION');
    socket.emit('news', {'Hello' : 'world'});
});
