(function() {
  'use strict';

  angular
    .module('esn.search')
    .component('esnSearchHeader', {
      template: require("./search-header.pug"),
      controller: 'ESNSearchHeaderController'
    });
})();
