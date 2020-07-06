(function(angular) {
  'use strict';

  angular.module('esn.clipboard', [
    'material.components.tooltip',
    'ngclipboard',
    'esn.notification'
  ]);
})(angular);

require('../notification.js');
require('./url/clipboard-url.component.js');
require('./url/clipboard-url.controller.js');