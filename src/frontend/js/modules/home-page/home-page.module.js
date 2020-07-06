(function(angular) {
  'use strict';

  angular.module('esn.home-page', [
    'esn.i18n',
    'esn.module-registry'
  ]);
})(angular);

require('../i18n/i18n.module.js');
require('../module-registry/module-registry.module.js');
require('./home-page.component.js');
require('./home-page.service.js');
