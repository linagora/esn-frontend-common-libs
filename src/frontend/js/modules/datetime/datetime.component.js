(function(angular) {
  'use strict';

  angular.module('esn.datetime')
    .component('esnDatetime', {
      template: require("./datetime.pug"),
      bindings: {
        datetime: '=',
        mode: '@'
      }
    });
})(angular);
