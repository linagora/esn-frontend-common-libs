const _ = require('lodash');

require('../../templates/user-notification-template-provider-registry.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.user-notification')
    .directive('esnUserNotificationListItem', esnUserNotificationListItem);

  function esnUserNotificationListItem($compile, esnUserNotificationTemplateProviderRegistry) {
    function link(scope, element) {
      var provider = esnUserNotificationTemplateProviderRegistry.get(scope.notification.category);
      var notificationTemplate = provider && provider.template || 'esn-user-notification-external';
      var forceClosePopoverOnClick = provider && provider.forceClosePopoverOnClick || false;
      var template;

      if (forceClosePopoverOnClick) {
        template =
          '<div class="user-notification-list-item" ng-click="hidePopover()">' +
            '<' + notificationTemplate + ' notification="notification">' +
          '</div>';
      } else {
        template =
          '<div class="user-notification-list-item">' +
            '<' + notificationTemplate + ' notification="notification">' +
          '</div>';
      }

      element.append($compile(template)(scope));
    }

    return {
      restrict: 'E',
      template: '',
      scope: {
        notification: '=',
        hidePopover: '&'
      },
      link: link
    };
  }
})(angular);
