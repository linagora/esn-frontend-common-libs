require('./time-zone-selector.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.datetime')
    .component('esnDatetimeTimeZoneSelector', {
      template: require('./time-zone-selector.pug'),
      controller: 'esnDatetimeTimeZoneSelectorController',
      bindings: {
        timeZone: '='
      }
    });
})(angular);
