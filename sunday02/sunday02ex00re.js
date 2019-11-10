const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const static = require('serve-static');
const path = require('path');

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


router.route('/').get((req, res)=> {
    console.log('GET - /');
    req.app.render('introo', {request:req, response:res}, (err, html) => {
       if(err) {
            console.log('render 에러 발생-!');
            throw err;
       }
        res.write(html);
        res.end();
    });
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://locahlost:%d', app.get('port'));
});
