require('./user-status.constants.js');
require('./services/user-status-sync.service.js');
require('./services/user-status-websocket.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.user-status').run(run);

  function run($interval, $rootScope, userStatusSyncService, userStatusWebsocketService, session, USER_STATUS_SYNC_INTERVAL) {
    session.ready.then(function() {
      userStatusWebsocketService.listen();
      $interval(userStatusSyncService.synchronize, USER_STATUS_SYNC_INTERVAL);
    });
  }

})(angular);
