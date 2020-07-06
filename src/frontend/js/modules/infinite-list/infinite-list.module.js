(function(angular) {
  'use strict';

  angular.module('esn.infinite-list', [
    'esn.constants',
    'esn.mutation-observer',
    'infinite-scroll'
  ]);
})(angular);

require('../../constants.js');
require('../esn.mutation-observer.js');
require('./infinite-list-scroll-helper-builder.service.js');
require('./infinite-list-scroll-helper.service.js');
require('./infinite-list-scroll-on-groups-helper.service.js');
require('./infinite-list.config.js');
require('./infinite-list.constants.js');
require('./infinite-list.directive.js');
require('./infinite-list.service.js');
