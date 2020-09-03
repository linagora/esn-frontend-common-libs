(function(angular) {
  'use strict';

  angular.module('esn.search').directive('esnSearchSubHeader', esnSearchSubHeader);

  function esnSearchSubHeader() {
    return {
      restrict: 'E',
      template: require('./sub-header.pug')
    };
  }

})(angular);
