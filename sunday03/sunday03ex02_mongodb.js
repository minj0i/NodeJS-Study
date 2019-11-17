const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost', function(err, conn) {
   if(err) throw err;
    
    // 몽고디비 모듈 버전3 방식의 db 불러오기
    var db = conn.db('vehicle');
    // 사용할 컬렉션 불러오기
    var car = db.collection('car');
    
    car.findOne({}, function(err2, doc){
        if(err2) throw err2;
        
        console.log(doc.name, doc.price, doc.company, doc.year);
        
        // DB를 닫아준다.
        conn.close(doc);
    });

});