require('./search-header.controller.js');

(function(angular) {
  'use strict';

  angular
    .module('esn.search')
    .component('esnSearchHeader', {
      template: require("./search-header.pug"),
      controller: 'ESNSearchHeaderController'
    });
})(angular);
