var fs = require('fs');
var http = require('http');

var server = http.createServer();
server.listen(3000, function() {
    console.log('http://localhost:3000');
});

// 요청되는 거니까 request
server.on('request', function(req, res) {
    console.log('>>> request ... ');
    
//    res.end('request ... ');
    var instream = fs.createReadStream('./output.txt');
    res.writeHead(200, {'Content-type': 'text/html; charset=utf8'});
    instream.pipe(res);
});
