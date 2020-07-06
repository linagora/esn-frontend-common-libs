(function(angular) {
  'use strict';

  angular.module('esn.file-browser', [
    'esn.datetime'
  ]);
})(angular);

require('../datetime/datetime.module.js');
require('./file-browser.component.js');
require('./file-browser.controller.js');