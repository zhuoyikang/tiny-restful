var restify = require('restify');

var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});


// 客户端发送http请求时需要http头: Content-Type application/json
server.post('/json_post', function create(req, res, next) {
    body = req.body;
    console.log("%s",body);
    var x= {
        2: body["t"]
    }
    res.send(200, x);
    return next();
});

server.listen(8889, function () {
    console.log('%s listening at %s', server.name, server.url);
});var rest
