'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
let filePath = null;
let express_host = null;
let express_port = null;

const JADE = "jade";
const electron_env = require('./package.json').env.electron;
const express_env = require('./package.json').env.express;
console.log('Electron is running as "%s" mode.', electron_env);

if (electron_env === JADE) { // jade
  const jade = require('jade');
  const html = jade.renderFile('./src/index.jade', { title: "ElectronApp", mode: express_env });
  filePath = './src/index.jade.html';
  fs.writeFileSync(filePath, html);
} else { // express
  require('babel-register')();
  const express_info = require('./express');
  express_host = express_info.host;
  express_port = express_info.port;
}

///////////////////////////////////////////////////////////////////////////////////////////

const app = require('app');  // Module to control application life.
const BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
  if (electron_env === JADE) {
    fs.unlink(filePath);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  //mainWindow.loadUrl('file://' + __dirname + '/src/index.html');
  if (electron_env === JADE) {
    let p = path.resolve('file://', __dirname, filePath)
    mainWindow.loadURL(p);
  } else {
    let url = 'http://' + express_host + ':' + express_port + '/src/';
    console.log(url);
    mainWindow.loadURL(url);
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
