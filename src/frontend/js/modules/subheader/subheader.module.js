(function(angular) {
  'use strict';

  angular.module('esn.subheader', [
    'esn.media.query',
    'esn.async-action'
  ]);
})(angular);

require('../async-action.js');
require('../media-query.js');
require('./save-button/save-button.component.js');
require('./save-button/save-button.controller.js');
require('./sub-header-aware.directive.js');
require('./sub-header-container.directive.js');
require('./sub-header.directive.js');
require('./sub-header.service.js');
require('./subheader.constants.js');
