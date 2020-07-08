require('./working-hours.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.business-hours')
    .component('esnBusinessHoursWorkingHours', {
      template: require("./working-hours.pug"),
      bindings: {
        start: '=', // string like 08:40
        end: '='
      },
      controller: 'esnBusinessHoursWorkingHoursController'
    });
})(angular);
