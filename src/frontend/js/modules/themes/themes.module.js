(function(angular) {
  'use strict';

  angular.module('esn.themes', [
    'restangular',
    'esn.http'
  ]);
})(angular);

require('../http.js');
require('./color-contrast.service.js');
require('./themes.service.js');
require('./apply-theme.service.js');