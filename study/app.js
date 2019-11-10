const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');
const bodyParser = require('body-parser');

app.set('port', 3000);

// view 엔진 경로 및 확장자
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public 경로 (외부에서 볼 수 있도록 한 것)
app.use('/public', static(path.join(__dirname, 'public')));


// 자동차 목록으로 구현하기 위한 배열
const CAR_LIST = [
  {id:1, name:'Sonata', price:3000, company:'HYNDAI', year:2017},
  {id:2, name:'BMW', price:1000, company:'BMW', year:2017},
  {id:3, name:'SM5', price:2000, company:'SAMSUNG', year:2017},
  {id:4, name:'K7', price:5000, company:'KIA', year:2017},
];

function getCarList() {
    return CAR_LIST;
}

// - 라우팅 패스 설정 부분
// root시 redirect
router.route('/').get(function(req, res) {
    res.redirect('/public/index.html');
});

// car list
router.route('/car_list').get(function(req, res) {
    console.log('carlist 요청 됨');
    
    var carlist = getCarList();
    
    res.app.render('car_list', {list: carlist}, function(err, html) {
        if(err) {
            console.log('view 엔진 렌더링 에러!');
            throw err;
        }
        res.end(html);
    });
});


// 라우터 미들웨어는 서버 구동 바로 전 선언
app.use('/', router);

//app을 넣으면 http와 app결합된 상태
const server = http.createServer(app);
server.listen(app.get('port'), function() {
   console.log('http://localhost:%d', app.get('port')); 
});