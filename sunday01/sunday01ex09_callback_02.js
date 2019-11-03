// 자바스크립트에서 함수 선언 방법 1
function func01(name, age, addr) {
    console.log('func01함수 실행');
    //함수를 호출하면 arguments 객체가 자동 생성
    console.log(arguments);
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
    
    console.log(name, age, addr);
};

//함수를 호출해야 실행한다.
//func01();
//매개변수 선언안하고 사용해도 실행됨. 
//func01('hong', 23, '서울');


// 자바스크립트에서 함수 선언 방법 2 - 참조변수에다가 함수 선언
//익명의 함수를 참조변수가 참조하는 형태
var func02 = function() {
    console.log('func02 함수 호출');
};

//함수 호출
//func02();

// 다른 변수에 함수를 참조시킨다.
//이때는 괄호를 붙이면 안된다. 참조가 아니라 실행이 되서 그 결과를 return 시키는 형태가 됨.
/*
var aaa = func01;
var bbb = func02;
*/

//함수 호출
//aaa("aa", 10, "bb");
//bbb();

var arr = [func01, func02, function(){ console.log('익명함수')}];
// for in
/*
for(var i in arr) {
    arr[i]('123', 333, 'hh');
}
*/

// for of
/*
for(var func of arr) {
    func();
}
*/

function ccc(callback) {
    ///callback이 함수인지 여부 판단
    if(typeof(callback) == 'function') {
        callback();
    }
}

ccc(func01);
ccc('hello');