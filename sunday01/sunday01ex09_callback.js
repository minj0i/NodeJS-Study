///////////////////////////////////
// 라이브러리
//var move = function(selector, target) {
var move = function(selector, target, callback) {
    var box = document.querySelector(selector);
//    var target = 300;
    
    //아래 this를 쓸 수 있으려면 box.callback을 선언해주어야 함
    box.callback = callback;
    
    var x = 0;
    var speed = 3;
    var interval = setInterval(function() {
        x = x + speed;
//        if(x >= 300) {
//            x = 300;
        if(x >= target) {
            x = target;
            
            clearInterval(interval);
            //어떤 처리가 끝났을때 호출하는 부분
//            callback(); //콜백함수 호출
            //box를 this로 쓰기 위해서 box.callback();이라고 해야 함
            box.callback();
        }
        box.style.left = x + 'px';
    }, 1000/30);
    //1초에 30분 정도 반복

};

///////////////////////////////////
// 사용자

window.onload = function() {
//    move('#box2');
    move('#box', 200, function() {
        //콜백함수에서 적용되는 부분
        //box.style.backgroundColor = "green";
        
        // this 쓰면 오류. window라고 생각하기 때문에
        // sunday01ex09_callback.js:36 Uncaught TypeError: Cannot set property 'backgroundColor' of undefined
        // console.log(this);
        this.style.backgroundColor = "green";

    });

};