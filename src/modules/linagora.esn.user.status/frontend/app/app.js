'use strict';

angular.module('linagora.esn.user-status', ['esn.websocket', 'esn.session']);

require('../../../../frontend/js/modules/websocket.js');
require('../../../../frontend/js/modules/session.js');
require('./bubble/user-status-bubble.component.js');
require('./bubble/user-status-bubble.controller.js');
require('./services/user-status-client.service.js');
require('./services/user-status-sync.service.js');
require('./services/user-status-websocket.service.js');
require('./services/user-status.restangular.service.js');
require('./services/user-status.service.js');
require('./app.constants.js');
require('./app.config.js');
require('./app.run.js');
