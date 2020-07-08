(function(angular) {
  'use strict';

  angular.module('esn.attachment-list', [
    'esn.attachment',
    'esn.infinite-list',
    'esn.provider',
    'esn.constants',
    'openpaas-logo'
  ]);
})(angular);

require('./attachment-list-providers.service.js');
require('./attachment-list.component.js');
require('./attachment-list.controller.js');
require('./item/attachment-list-item.component.js');