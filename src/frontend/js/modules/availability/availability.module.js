(function(angular) {
  'use strict';

  angular.module('esn.availability', [
    'esn.http'
  ]);
})(angular);

require('../http.js');
require('./availability.constants.js');
require('./availability.service.js');
