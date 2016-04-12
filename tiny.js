#!/usr/bin/env node


// 标准输入和输出重定向
var fs   = require('fs');
var proc   = require('process');

var access = fs.createWriteStream(__dirname + '/logs/access.log', { flags: 'a' })
var error = fs.createWriteStream(__dirname + '/logs/error.log', { flags: 'a' });

proc.stdout.pipe(access);
proc.stderr.pipe(error);

// 客户端发送http请求时需要http头: Content-Type application/json
var restify = require('restify');
var assert = require('assert');


// 自定义模块
var Config = require('./config');
var Mongo = require('./mongo');
var Logger = require('./logger').cheese;


// init mongo
Mongo.Config(Config["mongo"])

// init restify
var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// 查询玩家数据
server.post('/user_info', function create(req, res, next) {
    body = req.body;
    open_udid = req.headers["open_udid"]
    assert.notEqual(undefined, open_udid);

    Mongo.FindInitUser(open_udid, function(err, doc) {
        assert.equal(null, err);
        res.send(200, doc);
        return next();
    })
});

// 查询并更新玩家数据d
server.post('/user_count', function create(req, res, next) {
    body = req.body;
    open_udid = req.headers["open_udid"]
    assert.notEqual(undefined, open_udid);

    Mongo.FindInitUser(open_udid, function(err, doc) {
        assert.equal(null, err);
        doc.count = doc.count+1;
        Mongo.ReplaceUser(open_udid, doc)
        res.send(200, doc);
        return next();
    })
});



// begin listen
server.listen(8889, function () {
    Logger.info('%s listening at %s', server.name, server.url);
});var rest
