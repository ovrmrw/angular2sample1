import express from 'express'
import _ from 'lodash'
require('dotenv').load();
const EXPRESS_ENV = _.trim(process.env.EXPRESS_ENV); // development or production
const EXPRESS_HOST = _.trim(process.env.EXPRESS_HOST);
const EXPRESS_PORT = _.trim(process.env.EXPRESS_PORT);

function invoke() {
  const app = express();
  app.set('views', __dirname + '/src');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname)); // プロジェクトのルートフォルダになるようにする
  
  app.get('/', (req, res) => {
    res.redirect('/src');
  });
  
  app.get('/src', (req, res) => {
    res.render('index', { title: 'ExpressApp', mode: EXPRESS_ENV });
  });

  const port = Number(EXPRESS_PORT) || 3000;
  const host = EXPRESS_HOST || getIPAddress();
  const server = app.listen(port, host);
  console.log('Express server listening at http://%s:%s as "%s" mode.', host, port, EXPRESS_ENV);
  return { host: host, port: port };
};
module.exports = invoke();

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}