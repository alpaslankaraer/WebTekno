var io   = require('socket.io'),
    url  = require('url'),
    express = require('express'),
    http=require('http');

var app = express();
var path = require('path');
var server = http.createServer(app);
var socket = io.listen(server);
var bodyParser = require('body-parser');


app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//var MongoClient =require('mongodb').MongoClient,format = require('util').format;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
//MongoDB insert start
MongoClient.connect(url,function (err,db) {
    if (err) {
        throw err;
    }
    var dbo = db.db("mydb");
    var myobj = [
        { username: "alp", password: "3232"},
        { username: "berkay", password: "0606"},
        { username: "ferhat", password: "1515"},
        { username: "engin", password: "3030"}
    ];
    dbo.collection("users").insertMany(myobj, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Number of documents inserted: " + result.insertedCount);
        db.close();
    });
});
//MongoDB insert end
*/



app.get('/', function(req, res){
    res.render('index');
});

//MongoDB find start
app.post('/login', function(req, res){
    var myUser = req.body.username_text; 
    var myPass = req.body.password_text;

    //console.log(myUser);
    //console.log(myPass);//db baglantısı sorgu

    MongoClient.connect('mongodb://localhost:27017', function(err1,db)
    {
        if (err1) {
            throw err1;
        }
        else {
            var dbo = db.db("mydb");
            dbo.collection("users").find(/*{}, */{ username: myUser, password: myPass}).toArray(function(err, result) {     // *{}, bu kısmı kaldırınca düzeldi
            if (err || result[0].password!=myPass || result[0].username!=myUser)        // array in hangi değeri olduğunu belirtmeyince obje olarak alıyor
            {
                //console.log(result);
                console.log("WRONG USERNAME OR PASSWORD");
            }
            else {
                console.log(result);
                console.log("asfpjsdgşsfşakdşlafşk");
            }
            });
        }
        db.close();
    });
    
    res.render('index');
});
//MongoDB find end

app.listen(8888);
console.log('server running ' + 'now ' + Date.now());