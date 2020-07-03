(function() {
  'use strict';

  angular.module('esn.user-notification')
    .constant('ESN_USER_NOTIFICATION_POPOVER_OPTIONS', {
      animation: 'am-fade',
      trigger: 'manual',
      autoClose: true,
      placement: 'bottom',
      prefixEvent: 'user-notification',
      container: 'body',
      template: require("./popover/user-notification-popover.pug")
    })
    .constant('ESN_USER_NOTIFICATION_UNREAD_REFRESH_TIMER', 10 * 1000)
    .constant('ESN_USER_NOTIFICATION_WEBSOCKET', {
      NAMESPACE: '/usernotification',
      NOTIFICATION: {
        CREATED: 'usernotification:created',
        UPDATED: 'usernotification:updated'
      }
    });
})();
