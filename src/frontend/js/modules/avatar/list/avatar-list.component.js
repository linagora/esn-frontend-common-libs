require('./avatar-list.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.avatar')
    .component('esnAvatarList', esnAvatarList());

  function esnAvatarList() {
    return {
      template: require("./avatar-list.pug"),
      controller: 'ESNAvatarListController',
      bindings: {
        members: '<',
        limit: '=',
        profileLink: '@'
      }
    };
  }
})(angular);
