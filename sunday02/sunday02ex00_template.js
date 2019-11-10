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

router.route('/').get((req, res) =>{
    console.log('Get - /');
    res.redirect('/public/home.html');
});


app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`http://localhost:${app.get('port')}`);
});