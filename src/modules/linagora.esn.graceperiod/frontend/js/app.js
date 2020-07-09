(function(angular) {
  'use strict';

  angular.module('linagora.esn.graceperiod', ['esn.websocket', 'esn.notification', 'esn.http', 'esn.i18n']);
})(angular);

require('../../../../frontend/js/modules/websocket.js');
require('../../../../frontend/js/modules/notification.js');
require('../../../../frontend/js/modules/http.js');
require('../../../../frontend/js/modules/i18n/i18n.module');
require('./app.run.js');
require('./constants.js');
require('./grace-period-live-notification.service.js');
require('./grace-period-restangular.service.js');
require('./grace-period.service.js');
