var io   = require('socket.io'),
    url  = require('url'),
    express = require('express'),
    http=require('http');

var app = express();
var path = require('path');
var server = http.createServer(app);
var socket = io.listen(server);

app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(8080);
console.log('server running ' + 'now ' + Date.now());