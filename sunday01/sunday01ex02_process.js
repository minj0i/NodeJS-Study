console.log(process.argv.length);
console.log(process.argv);

if(process.argv.length > 2) {
    //일단 2보다 커야 함 (node의 위치, 현재 파일때문에 아무것도 없어서도 2)
    for (var i = 2; i<process.argv.length; i++){
        console.log(process.argv[i]);
    }
}

//환경 변수
// console.log(process.env['path']);
console.log(process.env['os']); //window NT라는 결과
