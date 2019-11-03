var fs = require('fs');

// 동기 방식 - 결과를 변수에 담아서 순차적으로 처리한다.
var data = fs.readFileSync('./package.json', 'utf8');

// 읽어 들인 데이터를 출력합니다.
console.log(data);

// 비동기 방식 - 결과를 콜백함수에서 처리한다.
// node.js 관례는 콜백의 첫번째 인자는 err인 경우가 많다.
fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log('비동기 방식의 파일 읽기');
    console.log(data);
});

