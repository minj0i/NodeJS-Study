// ejs 설치 : npm i -S ejs
// ejs 설정 및 render()
const http = require('http');
const express = require("express");
const app = express();
const router = express.Router();

app.set('port', 3000);
// views 폴더를 만들어 경로를 지정
app.set('views', __dirname+'/views'); // 접두어(views)로 ejf 파일 저장경로를 지정한다.
app.set('view engine', 'ejs'); // 확장자를 지정해 준다.

let sequence = 1;
let carList = [
  {"_id":sequence++, "name":"BMW", "price":3500, "company":"BMW", year:2019},
  {"_id":sequence++, "name":"Granduer", "price":3600, "company":"HYUNDAI", year:2018}
];

router.route('/').get(function(req, res) {
    let name = "HONG GILDONG";
    let infoData = {
        subject: 'English',
        score: 98,
        getData: function() {
            return this.subject+"은 "+this.score+"입니다.";
        } 
    };
    let menuData = [
        {title: '자동차목록', fileUri:'/car'},
        {title: '정보입력', fileUri:'/car/input'},
        {title: 'Google', fileUri:'http://google.com'}
    ];
    
    // name 변수의 내용이 index.ejs 페이지에 표시되도록 하시오.
//    req.app.render('index', {name:name, data:infoData}, function(err, html) {
//       if(err) throw err;
//        res.end(html); 
//    });

    // index.ejs에서 infoData를 쓸때 body안에 넣어줘야 하는 것
    // menuData를 불러올때도 넣어져있으면 에러나서 여기다 복붙해놓음
//    <h2>data: <%=data.subject%></h2>
//    <h2>data: <%=data.score%></h2>
//    <h3>fuction: <%=data.getData()%></h3>
    req.app.render('index', {name:name, menu:menuData}, function(err, html) {
       if(err) throw err;
        res.end(html); 
    });
});

// car라는 요청이 들어오면 car의 get으로 들어온다
router.route('/car').get(function(req, res) {
    req.app.render('car_list', {list:carList}, function(err, html) {
       if(err) throw err;
//        res.end('GET - /car');
        res.end(html);
    });
});

router.route('/car/input').get(function(req, res) {
     req.app.render('input', {}, function(err, html) {
       if(err) throw err;
        res.end(html);
    });
});

//:로 오는건 params
router.route('/car/detail/:_id').get(function(req, res) {
    var _id = req.params._id;
    
    console.log(_id);
//     req.app.render('input', {}, function(err, html) {
//       if(err) throw err;
//        res.end(html);
//    });
    res.end(_id);
});

router.route('/car/form').get(function(req, res) {

    //get방식은 queryString으로 날아옴
    var carData = {
        _id: sequence++,
        name: req.query.name,
        price: req.query.price,
        company: req.query.company,
        year: req.query.year,
    };
    
    console.log(carData);
    
    carList.push(carData);
    
    res.redirect('/car');
});


app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log(`http://localhost:${app.get('port')}`);
});
