(function(angular) {
  'use strict';

  angular.module('esn.search').directive('searchForm', searchForm);

  function searchForm(defaultSpinnerConfiguration) {
    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.spinnerKey = angular.isDefined($scope.spinnerKey) ? $scope.spinnerKey : defaultSpinnerConfiguration.spinnerKey;
        $scope.spinnerConf = angular.isDefined($scope.spinnerConf) ? $scope.spinnerConf : defaultSpinnerConfiguration.spinnerConf;
      },
      template: require("./search-form.pug")
    };
  }
})(angular);
