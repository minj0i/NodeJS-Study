// %d, %s, %i, %c
// js는 '캐릭터'와 "문자열" 구분 없음

console.log('숫자 보여주기 : %d', 555); //decimal로 포맷
console.log("문자열 보여주기: %s", "천리마 마트");
console.log('JSON 객체 보여주기: %j', {"name": "김태리"}); //json
console.log('JSON 객체 보여주기: ', {"name": "김태리"});
console.log("성명: "+ "김범준", "나이: "+ 125+"세");

let name = "KIM";
let age = 55;
console.log(`성명: ${name}, 나이: ${age}`);

var result = 0;//var는 함수를 scope

console.time('time_check');
for(var i=0; i <=100000; i++){
    result += i;
}

console.timeEnd('time_check');
console.log("결과: ", result); //console 로그에서는 + 대신 , 가능

console.log("현재 파일명 : ", __filename); //__ 붙이면 전역변수 같은 것
console.log("현재 디렉토리 : ", __dirname); 
