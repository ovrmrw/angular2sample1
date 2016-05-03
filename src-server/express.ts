import express from 'express';
import lodash from 'lodash';
import path from 'path';

require('dotenv').load();
// const EXPRESS_ENV = _.trim(process.env.EXPRESS_ENV); // development or production
const EXPRESS_HOST = String(process.env.EXPRESS_HOST).trim();
const EXPRESS_PORT = String(process.env.EXPRESS_PORT).trim();

const appRoot = path.resolve(__dirname, '..');
console.log('Application Root: ' + appRoot);

function invoke() {
  const app = express();
  app.set('views', appRoot + '/src-client');
  app.set('view engine', 'jade');
  app.use(express.static(appRoot)); // プロジェクトのルートフォルダになるようにする
  
  app.get('/', (req, res) => {
    res.redirect('/src-client');
  });
  
  app.get('/src-client', (req, res) => {
    // res.render('index', { title: 'ExpressApp', mode: EXPRESS_ENV });
    res.render('index', { title: 'ExpressApp' });
  });

  const port = Number(EXPRESS_PORT) || 3000;
  const host = EXPRESS_HOST || getIPAddress();
  const server = app.listen(port, host);
  console.log('Express server listening at http://%s:%s', host, port);
  return { host: host, port: port };
};
module.exports = invoke();

function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}