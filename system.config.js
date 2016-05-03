/* global System */
System.config({
  baseURL: '/',
  defaultJSExtensions: 'js',
  transpiler: false,
  paths: {
    'node:*': 'node_modules/*',
  },
  map: {
    'app': 'src-client/app',
    // 'numeral': 'node:numeral/min/numeral.min.js',
    // 'moment': 'node:moment/min/moment.min.js',
    'lodash': 'node:lodash/lodash.js',
    '@angular': 'node:@angular',
    'rxjs': 'node:rxjs',
    // 'zone.js': 'node:zone.js'
  },
  packages: {
    'app': { main:'boot'},
    '@angular/core': { main: 'index' },
    '@angular/common': { main: 'index' },
    '@angular/compiler': { main: 'index' },
    '@angular/platform-browser': { main: 'index' },
    '@angular/platform-browser-dynamic': { main: 'index' },
    '@angular/router': { main: 'index' },
    '@angular/router-deprecated': { main: 'index' },
    '@angular/http': { main: 'index' },
    'rxjs': {},
    // 'zone.js': {}
  }
});