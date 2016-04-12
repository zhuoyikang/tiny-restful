// 该模块处理yml配置

var yaml = require('js-yaml');
var fs   = require('fs');

var config = function() {
    try {
        var argv = require('yargs').argv;
        var config = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'));
        return config;
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}()


for(var i in config) {
    exports[i]=config[i]
}
