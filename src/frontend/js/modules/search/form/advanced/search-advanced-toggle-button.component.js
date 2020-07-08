require('./search-advanced-toggle-button.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.search').component('esnSearchAdvancedToggleButton', {
    template: require("./search-advanced-toggle-button.pug"),
    controller: 'ESNSearchAdvancedToggleButtonController',
    controllerAs: 'ctrl',
    bindings: {
      provider: '=',
      query: '<',
      search: '&'
    }
  });
})(angular);
