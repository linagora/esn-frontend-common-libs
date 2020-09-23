require('../search.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.search')
    .controller('ESNSearchHeaderController', ESNSearchHeaderController);

  function ESNSearchHeaderController(esnSearchService, searchProviders) {
    var self = this;

    // Check if we need to show the global search box
    self.showGlobalSearch = searchProviders.getNumberOfProviders() > 0;

    self.search = search;

    function search(query, provider) {
      esnSearchService.search(query, provider);
    }
  }
})(angular);
