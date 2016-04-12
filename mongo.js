// 该模块处理所有Db交互.
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config

var Config=function(conf){
    config=conf
}

// 玩家初始化数据
var userInitData = {"name": "xiaoming", "count": 1}

// 根据udid查询玩家数据，不存在则初始化.
var FindInitUser = function(udid, callback) {
    MongoClient.connect(config.url, function(err, db) {
        users = db.collection('users')
        users.findOne({"_id": udid}, function(err, doc) {
            assert.equal(null, err);
            if(doc == undefined) {
                userInitData["_id"]=udid
                users.insertOne(userInitData, function(err, doc1) {
                    assert.equal(null, err);
                    callback(err, userInitData);
                    db.close();
                })
            } else {
                callback(err,doc)
                db.close();
            }
        })
    });
}

// 保存玩家数据，前提是玩家数据一定要存在.
var ReplaceUser = function(udid, doc) {
    MongoClient.connect(config.url, function(err, db) {
        assert.equal(null, err);
        users = db.collection('users')
        users.replaceOne({"_id": udid}, doc, function(err, doc) {
            assert.equal(null, err);
            db.close();
        })
    })
}

exports.FindInitUser=FindInitUser
exports.ReplaceUser=ReplaceUser
exports.mongo=MongoClient
exports.Config=Config
