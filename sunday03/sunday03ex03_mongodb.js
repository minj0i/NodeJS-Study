// 배열로 목록 결과를 받아오기
const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const express = require('express');
const app = express();

app.set('port', 3000);

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

const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
    // 서버가 실행되자마자 connectDB로 바로 DB연결
    connectDB();
});