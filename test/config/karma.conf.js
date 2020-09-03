'use strict';

const webpackConfig = require('../../webpack.test');

module.exports = function(config) {
  const singleRun = process.env.SINGLE_RUN !== 'false';

  config.set({
    basePath: '../../',

    files: [
      'src/index.test.js'
    ],

    logLevel: config.LOG_ERROR,
    frameworks: ['mocha', 'sinon-chai'],
    colors: true,
    singleRun: singleRun,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['--headless'],
        prefs: { 'network.proxy.type': 0 }
      }    
    },

    reporters: ['spec'],

    preprocessors: {
      'src/index.test.js': ['webpack'],
      'src/frontend/js/modules/**/*.module.js': ['webpack'],
      'src/frontend/js/**/*.js': ['webpack']
    },

    plugins: [
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-spec-reporter',
      'karma-sinon-chai'
    ],

    webpack: webpackConfig
  });
};
