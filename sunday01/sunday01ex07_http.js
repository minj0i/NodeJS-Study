var http = require('http');

function service(req, res) {
    console.log('요청 들어 옴');
    var name = 'KimGilDong';
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.write('<html><body>');
    res.write(`<h1> ${name}의 홈페이지</h1>`);
    res.write('</body></html>')
    res.end();
}

var server = http.createServer(service);

server.listen(3000, function() {
    console.log('서버 실행 됨 >>> http://localhost:3000');
});
