(function(angular) {
  'use strict';

  angular.module('esn.configuration', ['esn.session', 'feature-flags']);
})(angular);

require('../http.js');
require('../session.js');
require('./config-api.service.js');
require('./config.constants.js');
require('./config.service.js');
