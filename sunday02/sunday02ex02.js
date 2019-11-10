const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

app.set('port', 3000);

app.use(cors());

// 계산기
router.route('/plus/:a/:b').get((req, res) => {
//    res.end(Number(req.params.a) + Number(req.params.b)+"");
    res.end((Number(req.params.a) + Number(req.params.b)).toString());
});

router.route('/minus/:a/:b').get((req, res) => {
    res.end((Number(req.params.a) - Number(req.params.b)).toString());
});

router.route('/multi/:a/:b').get((req, res) => {
    res.end((Number(req.params.a) * Number(req.params.b)).toString());
});

router.route('/div/:a/:b').get((req, res) => {
    res.end((Number(req.params.a) / Number(req.params.b)).toString());
});

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), function(){
   console.log('http://localhost:'+app.get('port')); 
});

