(function(angular) {
  'use strict';

  angular.module('esn.user-configuration', [
    'esn.configuration'
  ]);
})(angular);

require('../config/config.module.js');
require('./user-configuration.constants.js');
require('./user-configuration.service.js');
