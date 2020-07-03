(function(angular) {
  'use strict';

  angular.module('esn.follow').directive('followingList', followingList);

  function followingList() {
    return {
      restrict: 'E',
      controller: 'followingListController',
      template: require("./following-list.pug")
    };
  }
})(angular);
