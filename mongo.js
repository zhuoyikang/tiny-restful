// 该模块处理所有Db交互.

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var insertDocument = function(db, callback) {
    db.collection('restaurants').insertOne( {
        "address" : {
            "street" : "2 Avenue",
            "zipcode" : "10075",
            "building" : "1480",
            "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
            {
                "date" : new Date("2014-10-01T00:00:00Z"),
                "grade" : "A",
                "score" : 11
            },
            {
                "date" : new Date("2014-01-16T00:00:00Z"),
                "grade" : "B",
                "score" : 17
            }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};

var insertDemo = function(url) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });
}


// 根据udid查询玩家数据
var FindUser = function(udid) {
}

// 根据udid更新玩家数据
var SaveUser = function(udid,User) {
}


exports.insertDemo=insertDemo
exports.FindUser=FindUser
exports.SaveUser=SaveUser
exports.mongo=MongoClient
