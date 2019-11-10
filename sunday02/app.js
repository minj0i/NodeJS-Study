const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const static = require('serve-static');

app.set('port', 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use('/public', static(__dirname+'/public') );

router.route('/').get((req, res)=>{
    console.log('GET - /');
    req.app.render('index', {request:req, response:res}, (err, html)=>{
        if(err) throw err;
        res.end(html);
    });
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
});