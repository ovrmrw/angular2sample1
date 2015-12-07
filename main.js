'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
require('dotenv').load();
const EXPRESS_ENV = _.trim(process.env.EXPRESS_ENV);
const ELECTRON_ENV = _.trim(process.env.ELECTRON_ENV);
const JADE = "jade";

let filePath = null;
let serverInfo = null;

//const electron_env = env.ELECTRON_ENV; // require('./package.json').env.electron;
//const node_env = env.NODE_ENV; // require('./package.json').env.express;
console.log('Electron is running as "%s" mode.', ELECTRON_ENV);

if (ELECTRON_ENV === JADE) { // jade
  const jade = require('jade');
  const html = jade.renderFile('./src/index.jade', { title: "ElectronApp", mode: EXPRESS_ENV });
  filePath = './src/index.jade.html';
  fs.writeFileSync(filePath, html);
} else { // express
  require('babel-register')();
  serverInfo = require('./express');
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
  // if (ELECTRON_ENV === JADE) {
  //   fs.unlink(filePath);
  // }
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }  
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 1000 });

  // and load the index.html of the app.
  //mainWindow.loadUrl('file://' + __dirname + '/src/index.html');
  if (ELECTRON_ENV === JADE) {
    const p = path.resolve('file://', __dirname, filePath)
    mainWindow.loadURL(p);
  } else {
    const url = 'http://' + serverInfo.host + ':' + serverInfo.port + '/src/';
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