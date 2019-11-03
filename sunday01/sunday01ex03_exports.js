//모듈에 등록할 객체 선언
var calc = {};
calc.minus = function(a, b){
    return a - b;
}

// 객체를 모듈에 등록 한다.
//export 객체 자체를 calc로 바꿔 줄 수 있거나, 새로운 기능 추가 가능
module.exports = calc;

