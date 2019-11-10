const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');

app.set('port', 3000);
// 뷰엔진(동적 페이지) 설정
app.set('views', path.join(__dirname, 'views')); //접두사
app.set('view engine', 'ejs'); //확장자
// static 미들웨어 설정
// static (html, 이미지, 등을 정적으로 보여준다)
// server-static 모듈 설치 : npm i -S server-static
app.use('/public', static(path.join(__dirname, 'public')));

// 라우팅 패스 설정
router.route('/').get(function(req, res) {
   // index.html 페이지로 redirect 해준다.
    res.redirect('/public/');
});

// 환영 페이지로 이동
router.route('/welcome').get((req, res) => {
   // index.html 페이지로 redirect 해준다.
    // intro는 파일 이름만, 두번째는 전달 객체
    // 콜백함수는 첫번째 err, 두번째는 html
    console.log('GET - /');
    req.app.render('intro', {request:req, response:res}, (err, html)=>{
        if(err) throw err;
        res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
        res.end(html);
    });
});

app.use('/', router);
const server = http.createServer(app); // http + express
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
});