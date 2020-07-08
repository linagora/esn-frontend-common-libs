require('./user-notification-toggler.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.user-notification')
    .directive('esnUserNotificationToggler', esnUserNotificationToggler);

  function esnUserNotificationToggler($popover, ESN_USER_NOTIFICATION_POPOVER_OPTIONS) {
    return {
      controller: 'EsnUserNotificationTogglerController',
      controllerAs: 'ctrl',
      link: link,
      restrict: 'E',
      replace: true,
      scope: true,
      template: require("./user-notification-toggler.pug")
    };

    function link(scope, element) {
      scope.popover = $popover(element, ESN_USER_NOTIFICATION_POPOVER_OPTIONS);
    }
  }
})(angular);
