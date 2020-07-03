(function(angular) {
  'use strict';

  angular.module('esn.search').component('esnSearchResultItem', {
    bindings: {
      item: '=',
      query: '='
    },
    controller: 'ESNSearchResultItemController',
    template: require("./search-result-item.pug")
  });
})(angular);
