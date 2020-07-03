(function(angular) {
  'use strict';

  angular.module('esn.datetime')
    .component('esnDatetimeTimeFormatSelector', {
      template: require("./timeformat-selector.pug"),
      bindings: {
        use24hourFormat: '='
      },
      controller: 'esnDatetimeTimeFormatSelectorController'
    });
})(angular);
