const { applyPolyfills, defineCustomElements } = require('esn-frontend-application-grid/loader');

applyPolyfills().then(() => defineCustomElements());

// TODO: Write tests for this
angular.module('esn.application-menu', [])
  .directive('applicationMenuToggler', function($log) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template: require('../../views/modules/application-menu/application-menu-toggler.pug'),
      link: function($scope) {
        $scope.appGridItems = window.openpaas.APP_GRID_ITEMS || process.env.APP_GRID_ITEMS;

        if (!$scope.appGridItems) {
          $log.error('The environment variable APP_GRID_ITEMS has not been defined yet, and the application grid will break.');
        }
      }
    };
  });
