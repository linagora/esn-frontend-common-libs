(function(angular) {
  'use strict';

  angular.module('esn.follow').directive('followerList', followerList);

  function followerList() {
    return {
      restrict: 'E',
      controller: 'followerListController',
      template: require("./follower-list.pug")
    };
  }
})(angular);
