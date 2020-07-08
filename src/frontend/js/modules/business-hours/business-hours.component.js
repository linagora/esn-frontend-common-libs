require('./business-hours.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.business-hours')
    .component('esnBusinessHours', {
      template: require("./business-hours.pug"),
      bindings: {
        businessHours: '='
      },
      controller: 'esnBusinessHoursController'
    });
})(angular);
