// 배열로 목록 결과를 받아오기
const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');
const static = require('serve-static');

app.set('port', 3000);
// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 미들 웨어 연결
app.use(cors());
app.use('/public', static(path.join(__dirname, 'public')));


// ----- 함수 선언하는 부분, 나중에 함수 모듈로 분리 시킬 수 있음
var db;
// 함수 안에다 넣어서 선언
function connectDB() {
    MongoClient.connect('mongodb://localhost', function(err, conn) {
       if(err) throw err;

        // 몽고디비 모듈 버전3 방식의 db 불러오기
        db = conn.db('vehicle');

        console.log('MongoDB connection 성공!!');
    });
} // end of connectDB

function carList(db, callback) {
  // db에서 collection을 받아오기
    var car = db.collection('car');
    
  // collection에서 목록을 받아온다.
    car.find({}).toArray(function(err, arr) {
        //결과는 callback함수로
        // callback에서 에러를 받으면 아래 callList에서 err처리로 넘어감
        if(err) {
            console.log('err발생');
            callback(err, null);
            return;
        }
        if(arr != null && arr.length > 0 ) {
            //내용은 없고 arr 넘겨준다.
            callback(null, arr);
        } else {
            console.log('검색 결과 없음');
            callback(null, null);
        }
    });
    
  // 콜백함수 호출
    
};


// ----- 라우팅 설정하는 부분
router.route('/car/list').get(function(req, res) {
   console.log('/car/list 요청 됨');
    
    // DB처리 하는 함수 호출
    if(db) {
        carList(db, function(err, docs) {
            if(err) {
                res.end('DB select error');
                throw err;
                return;
            }
            
            if(docs != null) {
//                console.log(docs); // 우선 어떤 형태로 오는지 확인
//                res.send(docs);
                // 뷰 엔진으로 넘기기
                  req.app.render('car_list', {carlist:docs}, function(err, html) {
                      if(err) {
                          console.log('ejs 렌더링 에러!');
                          throw err;
                      }
                      res.end(html);
                  });
            } else {
                res.end("empty!");
            }
        });
    } else {
        res.end('DB connection error!');
    }
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
    // 서버가 실행되자마자 connectDB로 바로 DB연결
    connectDB();
});