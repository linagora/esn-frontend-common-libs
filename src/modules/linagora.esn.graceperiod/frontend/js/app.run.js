require('./grace-period-live-notification.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.graceperiod')
    .run(function(gracePeriodLiveNotificationService) {
      gracePeriodLiveNotificationService.start();
    });
})(angular);
