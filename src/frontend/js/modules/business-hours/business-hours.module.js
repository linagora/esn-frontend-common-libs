(function(angular) {
  'use strict';

  angular.module('esn.business-hours', [
    'angularMoment',
    'angular-clockpicker',
    'esn.configuration',
    'esn.datetime'
  ]);
})(angular);

require('../config/config.module.js');
require('../datetime/datetime.module.js');
require('./business-hours.component.js');
require('./business-hours.controller.js');
require('./working-days/working-days.component.js');
require('./working-days/working-days.controller.js');
require('./working-hours/working-hours.component.js');
require('./working-hours/working-hours.controller.js');
