import express from 'express'
import _ from 'lodash'

function invoke() {
  const app = express();
  app.set('views', __dirname + '/src');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname)); // プロジェクトのルートフォルダになるようにする
  const mode: string = _.trim(app.get('env')); // development or production
  
  app.get('/', (req, res) => {
     res.redirect('/src');
  })

  app.get('/src', (req, res) => {
    res.render('index', { title: 'ExpressApp', mode: mode });
  });

  const port = Number(_.trim(process.env.PORT)) || 3000;
  //const host = _.trim(process.env.HOST) || getIPAddress();
  const host = _.trim(process.env.HOST) || 'localhost';
  const server = app.listen(port, host);
  console.log('Express server listening at http://%s:%s as "%s" mode.', host, port, mode);
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