(function(angular) {
  'use strict';

  angular.module('esn.pagination', [
    'esn.infinite-list',
    'esn.aggregator'
  ]);
})(angular);

require('../aggregator.js');
require('../infinite-list/infinite-list.module.js');
require('./pagination-provider-builder.service.js');
require('./pagination-provider.service.js');
require('./pagination.constants.js');
