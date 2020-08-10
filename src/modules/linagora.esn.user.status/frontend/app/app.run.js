'use strict';

require('./app.constants.js');
require('./services/user-status-sync.service.js');
require('./services/user-status-websocket.service.js');

angular.module('linagora.esn.user-status')
  .run(function($interval, userStatusSyncService, userStatusWebsocketService, session, USER_STATUS_SYNC_INTERVAL) {
    session.ready.then(function() {
      userStatusWebsocketService.listen();
      $interval(userStatusSyncService.synchronize, USER_STATUS_SYNC_INTERVAL);
    });
  });
