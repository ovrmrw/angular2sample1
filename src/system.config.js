/* global System */
System.config({
  baseURL: '.',
  transpiler: false,
  paths: {
    'node:*': '../node_modules/*'
  },
  map: {
    'babel-polyfill': 'node:babel-polyfill/dist/polyfill.min.js',
    'numeral': 'node:numeral/min/numeral.min.js', // app.tsのimportで必要
    'moment': 'node:moment/min/moment.min.js', // app.tsのimportで必要
    'lodash': 'node:lodash/index.js', // app.tsのimportで必要
    'prominence': 'node:prominence/lib/prominence.js',
    'jsonfile': 'node:jsonfile/index.js'
  },
  packages: {
    'app': { defaultExtension: 'js' },
    'page1': { defaultExtension: 'js' },
    'page2': { defaultExtension: 'js' }
  },
  meta: {
    'app/*.js': { deps: ['babel-polyfill'] }
  }
});