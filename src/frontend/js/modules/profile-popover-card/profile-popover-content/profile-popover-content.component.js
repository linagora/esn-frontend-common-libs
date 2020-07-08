require('./profile-popover-content.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.profile-popover-card').component('profilePopoverContent', {
    template: require("./profile-popover-content.pug"),
    controller: 'profilePopoverContentController',
    bindings: {
      user: '<',
      isCurrentUser: '<',
      objectType: '<',
      hideComponent: '&'
    }
  });
})(angular);
