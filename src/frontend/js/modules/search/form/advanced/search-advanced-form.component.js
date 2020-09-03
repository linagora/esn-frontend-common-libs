require('./search-advanced-form.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.search').component('esnSearchAdvancedForm', {
    template: require('./search-advanced-form.pug'),
    controller: 'ESNSearchAdvancedFormController',
    controllerAs: 'ctrl',
    bindings: {
      search: '&'
    }
  });
})(angular);
