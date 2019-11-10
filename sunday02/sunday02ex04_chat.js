const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const static = require('serve-static');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', static(path.join(__dirname, 'public')));

router.route('/').get((req, res) => {
    console.log('Get - /');
    res.redirect('/public/home.html');
});

var cnt = 0;
var date;

function end(req, res) {
    var countObject = {
        cnt: cnt,
        date: date
    }
    res.send(countObject);
}
router.route('/counter').get((req, res) => {
    console.log('Get - /counter');

    cnt++;
    date = new Date();

    end(req, res);
    //    res.end(JSON.stringify(countObject) );
    // send로 하면 객체로 오기 때문에 활용하기 편하다
    //res.send(countObject);
});

router.route('/chkCnt').get((req, res) => {
    var size = req.query.size;

    if (size >= cnt) {
        res.end();
    } else {
        end(req, res);
    }
});


app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log(`http://localhost:${app.get('port')}`);
});
