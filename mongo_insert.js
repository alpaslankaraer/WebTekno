var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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
