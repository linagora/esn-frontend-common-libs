(function(angular) {
  'use strict';

  angular.module('esn.people', [
    'esn.http'
  ]);

})(angular);

require('../http.js');
require('./people.constant.js');
require('./people-api-client.service.js');
