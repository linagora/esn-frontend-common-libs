require('./services/websocket/listener.service.js');
require('./templates/user-notification-template-provider-registry.service.js');
require('./services/user-notification.service.js');
require('./services/providers/user-notification-default-provider.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.user-notification')
    .run(run);

  function run(
    esnUserNotificationWebsocketListenerService,
    esnUserNotificationTemplateProviderRegistry,
    esnUserNotificationService,
    esnUserNotificationDefaultProvider
  ) {
    esnUserNotificationService.addProvider(esnUserNotificationDefaultProvider);
    esnUserNotificationWebsocketListenerService.listenEvents();
    esnUserNotificationTemplateProviderRegistry.add({
      template: 'esn-user-notification-external-template',
      category: 'external'
    });
    esnUserNotificationTemplateProviderRegistry.add({
      template: 'esn-user-notification-simple-template',
      category: 'simple'
    });
  }
})(angular);
