var mongojs = require('mongojs');
//컬렉션은 여러개 가지고 올 수 있기 때문에 배열
var db = mongojs('vehicle', ['car']);
//function(err, data) { }와 같은 것
db.car.find((err, data) => { 
   console.log(data); 
});