(function(angular) {
  'use strict';

  angular.module('esn.box-overlay', [
    'esn.constants',
    'esn.notification',
    'ng.deviceDetector',
    'esn.i18n'
  ]);
})(angular);

require('../notification.js');
require('./box-overlay-container.directive.js');
require('./box-overlay-manager.service.js');
require('./box-overlay-opener.service.js');
require('./box-overlay-state-manager.service.js');
require('./box-overlay.constants.js');
require('./box-overlay.directive.js');
require('./box-overlay.provider.js');
require('./box-overlay.run.js');
