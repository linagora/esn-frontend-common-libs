require('./profile-menu.controller.js');

(function(angular) {
'use strict';

  angular.module('esn.profile-menu')
    .component('profileMenu', {
      template: require("./profile-menu.pug"),
      controller: 'ESNProfileMenuController',
      controllerAs: 'ctrl'
    });
})(angular);
