// ejs 설치 : npm i -S ejs
// ejs 설정 및 render()
const http = require('http');
const express = require("express");
const app = express();
const router = express.Router();

app.set('port', 3000);
// views 폴더를 만들어 경로를 지정
app.set('views', __dirname+'/views'); // 접두어(views)로 ejf 파일 저장경로를 지정한다.
app.set('view engine', 'ejs'); // 확장자를 지정해 준다.

let carList = [
  {"name":"BMW", "price":3500, "company":"BMW", year:2019},
  {"name":"Granduer", "price":3600, "company":"HYUNDAI", year:2018}
];


router.route('/').get(function(req, res) {
    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.write('<h1>자동차 리스트 받기</h1>');
    res.write('<a href="/car">CarList</a>');    
    res.end();
});

// car라는 요청이 들어오면 car의 get으로 들어온다
router.route('/car').get(function(req, res) {
    req.app.render('car_list', {list:carList}, function(err, html) {
       if(err) throw err;
//        res.end('GET - /car');
        res.end(html);
    });
});


app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log(`http://localhost:${app.get('port')}`);
});
