var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app).listen(3000, function() {
    console.log('서버가 실행 되었습니다 : ', 3000);
});

var io = require('socket.io').listen(server);

//io.of라는 걸 쓰면 name space를 따로 따로 쓸 수 있음
var chat = io.of('/chat').on('connection', function(socket) {
    console.log('chat connection ... ');  
    socket.emit('a message', {
        that : 'only',
        '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone : 'in',
        '/chat' : 'will get'
    });
    chat.on('hi', function(msg){
        console.log('hi', msg);
    });
    socket.on('hi', function(msg){
        console.log('hi', msg);
    });
});

var news = io.of('/news').on('connection', function(socket){
    socket.emit('item', {
        news : 'item'
    });
    socket.on('woot', function(msg) {
        console.log('woot...');
    });
});
