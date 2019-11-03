var path = require('path');

//디렉토리 이름 합치기(변환하기)
var directories = ["users","newDir","newDocs"];
var docsDirectory = directories.join(path.sep);
console.log('문서 디렉토리: %s', docsDirectory);

// 디렉토리 이름과 파일명 합치기
var curPath = path.join('/Users/newDir', 'app.exe');
console.log('파일 패스: %s', curPath);

//패스에서 디렉토리, 파일명, 확장자 구별하기
var filename = "C:\\Users\\newDir\\app.exe";
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);
console.log(dirname,basename,extname);
