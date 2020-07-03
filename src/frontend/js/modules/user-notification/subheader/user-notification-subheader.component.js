(function() {
  'use strict';

  angular.module('esn.user-notification')
    .component('esnUserNotificationSubheader', esnUserNotificationSubheader());

  function esnUserNotificationSubheader() {
    return {
      template: require("./user-notification-subheader.pug")
    };
  }

})();
