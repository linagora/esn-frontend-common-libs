(function() {
'use strict';

  angular.module('esn.profile-menu')
    .component('profileMenu', {
      template: require("./profile-menu.pug"),
      controller: 'ESNProfileMenuController',
      controllerAs: 'ctrl'
    });
})();
