const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); //접두사
app.set('view engine', 'ejs'); //확장자

// 미들웨어
app.use('/public', static(path.join(__dirname, 'public')));

// 라우팅 패스 설정
router.route('/').get((req, res) =>{
    console.log('Get - /');
    res.redirect('/public/home.html');
});

router.route('/personArray').get((req, res) => {
    console.log('Get - /');
    let arr = [
        {name:'김길동', phone:'010-1111-1111'},
        {name:'박길동', phone:'010-1111-1111'},
        {name:'김길순', phone:'010-1111-1111'},
        {name:'박길자', phone:'010-1111-1111'},
        {name:'이순신', phone:'010-1111-1111'},
    ];
    res.send(arr);
});

app.use('/', router);
const server = http.createServer(app); // http + express
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
});