var http = require('http'); // 내장이라서 바로 쓸 수 있음

var server = http.createServer();

server.on('request', function(req, res) {
    console.log('request 요청 됨.'); //termianl에 쓰여짐
    
    //그대로 쓰면 깨지므로
    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.end('request 요청 됨!!'); //브라우저에 쓰여짐
    
    server.close();
});

server.on('connection', function(socket) {
   console.log('connection....'); //이걸 쓰면 request요청이 두번 됨
});

server.on('close', function() {
   console.log('close ...'); 
});

server.listen(3000, function() {
    console.log('서버 실행');
});

