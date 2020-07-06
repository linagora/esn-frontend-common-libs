require('./working-days.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.business-hours')
    .component('esnBusinessHoursWorkingDays', {
      template: require("./working-days.pug"),
      bindings: {
        daysOfWeek: '='
      },
      controller: 'esnBusinessHoursWorkingDaysController'
    });
})(angular);
