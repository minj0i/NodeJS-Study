//express와 socket.io를 함께 실행
var http = require('http');
var express = require('express');
var app = express();
var socketio = require('socket.io');

app.set('port', 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
   console.log('서버실행중 : %d', app.get('port')); 
});

//---------------------------------
// 로그인 ID와 소켓 ID를 매핑한다.
// 접속된 받는사람 id를 이용해서 저장된 socket_id를 찾아서 메세지 전달 
// {test1:sockets_id, test2:sockets_id, ...}
var login_ids = {};

var io = socketio.listen(server);

function sendResponse(socket, command, code, message) {
    var statusObj = {
        command: command,
        code: code,
        data: message.data,
        sender: message.sender
    }
    socket.emit('message', statusObj);
};


io.sockets.on('connection', function(socket){
   console.log('connection ...'); 

    socket.on('message', function(message){
        console.log('message 받음...', message);
        if(message.recepient == 'All') {
            // io.sockets.emit('message', message); // sockets.emit은 echo. 접속된 모든 사용자에게 전달됨
//            io.socket.emit('message', data); // socket은 보낸사람에게만
            sendResponse(io.sockets, 'message', '200', message);
        } else {
            //로그인 ids에서 받는사람의 socketID를 찾아서 소켓 연결
            var recepient = message.recepient;
            if(login_ids[recepient]) {
                var socket_id = login_ids[recepient];
                //상대방 소켓은 sockets에서 찾아야 함
                var recepient_socket = io.sockets.connected[socekt_id];
                sendResponse(recepient_socket, 'login', '200', message);
                sendResponse(socket, 'login', '200', message); //자기 자신에게도 뜨게 하는 용
            } else {
                sendResponse(socket, 'login', '200', {data:'상대방 로그인 아이디 없음', sender: 'Server'});
            }
        }
    });
    
    socket.on('login', function(login) {
        //login_ids에 로그인 유저의 socketID를 저장한다.
        login_ids[login.id] = socket.id; //소켓 아이디를 로그인 아이디의 키 값으로 넣어주고
        socket.login_id = login.id; //나중에 검사할 때 필요할 수 있으므로 이렇게 만들어준다.
        
        console.log('접속한 클라이언트는 %d개 입니다.', Object.keys(login_ids).length);
        
        sendResponse(socket, 'login', '200', {data:'로그인 성공', sender: 'Server'});
    });
});