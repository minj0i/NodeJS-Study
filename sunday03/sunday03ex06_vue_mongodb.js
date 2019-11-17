// 배열로 목록 결과를 받아오기
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
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

function insertData(db, carData, callback) {
    console.log('insertData 함수 호출');
    
    var car = db.collection('car');
    
    car.insert(carData, function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
         if(result.insertedCount > 0) {
            console.log("사용자 레코드 추가 됨 : ", result.insertedCount);
        } else {
            console.log("추가 된 카운트 없음")
        }
        callback(null, result);
    });
    
    // insertMany를 사용하는 방법
//    car.insertMany([carData], function(err, result) {
//        if(err) {
//            callback(err, null);
//            return;
//        }
//         if(result.insertedCount > 0) {
//            console.log("사용자 레코드 추가 됨 : ", result.insertedCount);
//        } else {
//            console.log("추가 된 카운트 없음")
//        }
//        callback(null, result);
//    });
};

function deleteData(db, carName, callback) {
    var car = db.collection('car');
    
    car.remove(carName, function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

// id로 삭제하는 법
function removeData(db, _id, callback) {
    console.log('removeData 호출...');
    
    var car = db.collection('car');
    car.remove({_id:new ObjectId(_id)}, function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

// id로 수정하는 법
function updateData(db, carId, callback) {
    var car = db.collection('car');
    
    car.update({_id:new ObjectId(_id)}, function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
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
                res.send(docs);
            } else {
                res.end("empty!");
            }
        });
    } else {
        res.end('DB connection error!');
    }
});

//params 받아서 추가하기
router.route('/car/insert/:name/:price/:company/:year').get(function(req, res) {
    var carData = {
        name: req.params.name,
        price: req.params.price,
        company: req.params.company,
        year: req.params.year,
    }
    
    if(db) {
        insertData(db, carData, function(err, result){
            if(err) {
                res.end('DB insert error');
                throw err;
                return;
            }
            if(result) {
                console.log('처리 성공');
            } else {
                console.log('처리 실패');
            }
            res.redirect('/car/list');
        });
    } else {
        console.log('db가 연결되어 있지 않습니다.');
        res.redirect('/car/list');
    }
});

//params 받아서 삭제하기
router.route('/car/delete/:name/:price/:company/:year').get(function(req, res) {
    var carData = {
        name: req.params.name,
        price: req.params.price,
        company: req.params.company,
        year: req.params.year,
    }
    
    if(db) {
        deleteData(db, carData, function(err, result){
            if(err) {
                res.end('DB delete error');
                throw err;
                return;
            }
            // DB에 넣은 결과를 확인한다.
            res.redirect('/car/list');
        });
    } else {
        console.log('db가 연결되어 있지 않습니다.');
        res.redirect('/car/list');
    }
});

//param으로 id 받아서 삭제하기
router.route('/car/remove/:_id').get(function(req, res) {
   var id = req.params._id;
    
   if(db) {
       removeData(db, id, function(err, result) {
         if(err) {
                res.end('DB remove error');
                throw err;
                return;
            }
            res.redirect('/car/list');
        });
    } else {
        console.log('db가 연결되어 있지 않습니다.');
        res.redirect('/car/list');
    }
});

//param으로 id받아서 수정하기
router.route('/car/update/:_id').get(function(req, res) {
   var id = req.params._id;
//    console.log('update...', _id);
    
   if(db) {
       updateData(db, id, function(err, result) {
         if(err) {
                res.end('DB update error');
                throw err;
                return;
            }
            res.redirect('/car/list');
        });
    } else {
        console.log('db가 연결되어 있지 않습니다.');
        res.redirect('/car/list');
    }
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
    // 서버가 실행되자마자 connectDB로 바로 DB연결
    connectDB();
});
