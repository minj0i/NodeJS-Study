var fs = require('fs');

var msg = "Hello world, 안녕하세요";
fs.writeFile('./output.txt', msg, function(err){
    if(err){
        console.log('err발생', err);
        return;
    }
    console.log('output.txt 파일에 쓰기 완료!');
})