// express 모듈 설치
// npm install express --save
// npm i -S express
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router(); //URL 요청 라우터(미들웨어 등록 필수)

//외부에서 들어오는 path 지정
router.route('/').get(function(req, res) {
    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.write('<h1>길동이의 홈페이지</h1>');
    //이렇게 집어넣는것이 디자인하기에는 어려워서 EJS로 처리하게 됨
    res.write('<a href="/profile">Profile</a>');
    
    // end까지 써줘야 정상적 처리
    res.end();
});

// => 함수는 function() 이랑 같은 것, arrow function
router.route('/profile').get((req,res)=> {
    res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
    res.write('<h2>프로필입니다</h2>');
    // end까지 써줘야 정상적 처리
    res.end();
});

// server 실행 전에 router 미들웨어 등록
app.use('/', router);
const server = http.createServer(app); //http와 express 결합!
server.listen(3000, function() {
    console.log('http://localhost:3000');
});


//앞에서부터 일단 여기까지는 외우는게 좋음