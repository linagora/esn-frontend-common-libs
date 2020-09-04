require('./search-provider-select.controller.js');

(function(angular) {
  'use strict';

  angular
    .module('esn.search')
    .component('esnSearchProviderSelect', {
      template: require('./search-provider-select.pug'),
      controller: 'ESNSearchProviderSelectController',
      controllerAs: 'ctrl',
      bindings: {
        providers: '<',
        onProviderSelected: '&'
      }
    });
})(angular);
