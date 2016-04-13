var redis = require("redis");
var client = redis.createClient();
var assert = require('assert');

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});


var Del = function(rankKey) {
    var args = [rankKey];
    client.del(args);
}

// zsorted_set API
var ZAdd = function(rankKey, score, id) {
    var args = [rankKey, score, id];
    client.zadd(args, function (err, response) {
        if (err) throw err;
    });
}

var ZRange = function(rankKey, rankFrom, rankTo, callback) {
    var args = [rankKey, rankFrom, rankTo, 'WITHSCORES'];
    client.zrevrange(args, callback);
}

var Quit = function() {
    client.quit()
}


// hash API
var HGet = function(hashKey, key) {
    args = [hashKey, key]
    client.hget(args, function (err, response) {
        if (err) throw err;
    });
}


// hash API
var HMGet = function(hashKey, keyList, callback) {
    console.log("hmget", hashKey, keyList)
    client.hmget(hashKey, keyList, callback);
}


var HSet = function(hashKey, key, value) {
    args = [hashKey, key, value]
    client.hset(args, function (err, response) {
        if (err) throw err;
    });
}


// 基于zsorted_set和hash的排名系统.
var RAdd = function(Key, score, id, data) {
    rankKey = Key+"_zset"
    hashKey = Key+"_hash"
    HSet(hashKey, id, data.toString())
    ZAdd(rankKey, score, id);
}

// 根据排名范围筛选
var RRange = function(Key, rankFrom, rankTo, callback) {
    rankKey = Key+"_zset"
    hashKey = Key+"_hash"
    ZRange(rankKey, rankFrom, rankTo, function(err, response) {
        assert.equal(null, err);
        IdList = response.filter(function(element, index, array){ return index % 2 == 0  });
        HMGet(hashKey, IdList, callback)
    })
}

var RDel = function(Key) {
    rankKey = Key+"_zset"
    hashKey = Key+"_hash"
    Del(rankKey)
    Del(hashKey)
}


exports.Del = Del;
exports.Quit = Quit;

exports.RAdd = RAdd;
exports.RRange = RRange;
exports.RDel = RDel;

exports.HMGet = HMGet;
