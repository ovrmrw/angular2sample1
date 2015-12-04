'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express_env = require('./package.json').env.express;
function invoke() {
    var app = (0, _express2.default)();
    app.set('views', __dirname + '/src');
    app.set('view engine', 'jade');
    app.use(_express2.default.static(__dirname)); // プロジェクトのルートフォルダになるようにする
    var mode = express_env; // development or production
    app.get('/', function (req, res) {
        res.redirect('/src');
    });
    app.get('/src', function (req, res) {
        res.render('index', { title: 'ExpressApp', mode: mode });
    });
    var port = Number(_lodash2.default.trim(process.env.PORT)) || 3000;
    //const host = _.trim(process.env.HOST) || getIPAddress();
    var host = _lodash2.default.trim(process.env.HOST) || 'localhost';
    var server = app.listen(port, host);
    console.log('Express server listening at http://%s:%s as "%s" mode.', host, port, mode);
    return { host: host, port: port };
}
;
module.exports = invoke();
function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) return alias.address;
        }
    }
    return '0.0.0.0';
}