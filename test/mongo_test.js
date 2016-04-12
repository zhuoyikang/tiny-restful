// mongo 单元测试

Mongo = require('../mongo');
Mongo.Config({"url": 'mongodb://localhost:27017/test'})
udid = "udid2"
user = {"_id": udid, "name": "xiaoming", "count": 1}


// 创建并初始化一个.
Mongo.FindInitUser(udid, function(err, doc) {
    console.log("user ", doc)
})

// 更新部分玩家数据并保存.
Mongo.FindInitUser(udid, function(err, doc) {
    doc.count =  doc.count+1;
    Mongo.ReplaceUser(udid, doc)
})

