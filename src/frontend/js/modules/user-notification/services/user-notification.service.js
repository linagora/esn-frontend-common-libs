const _ = require('lodash');

require('./providers/user-notification-providers.service.js');
require('./user-notification-state.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.user-notification')
    .factory('esnUserNotificationService', esnUserNotificationService);

  function esnUserNotificationService(
    esnUserNotificationProviders,
    esnUserNotificationState
  ) {
    return {
      addProvider: addProvider,
      getListFunctions: getListFunctions
    };

    function addProvider(provider) {
      esnUserNotificationProviders.add(provider);
      esnUserNotificationState.init();
    }

    function getListFunctions() {
      return _.values(esnUserNotificationProviders.getAll())
        .map(function(provider) {
          return provider.list;
        });
    }
  }
})(angular);
