/* global System */
System.config({
  baseURL: '.',
  transpiler: false,
  paths: {
    'node:*': '../node_modules/*',    
  },
  map: {
    'babel-polyfill': 'node:babel-polyfill/dist/polyfill.min.js', // async/awaitに必要。
    'numeral': 'node:numeral/min/numeral.min.js',
    'moment': 'node:moment/min/moment.min.js',
    'lodash': 'node:lodash/index.js',
    'prominence': 'node:prominence/lib/prominence.js',
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