require('./search-result.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.search').component('esnSearchResult', {
    template: require("./search-result.pug"),
    controller: 'ESNSearchResultController',
    controllerAs: 'ctrl'
  });
})(angular);
