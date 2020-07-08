(function(angular) {
  'use strict';

  angular.module('esn.user-notification', [
    'esn.core',
    'esn.constants',
    'esn.feature-registry',
    'esn.http',
    'esn.media.query',
    'esn.object-type',
    'esn.router',
    'esn.session',
    'esn.websocket',
    'esn.registry',
    'esn.pagination'
  ]);
})(angular);

require('../../constants.js');
require('../core.js');
require('../esn.router.js');
require('../feature-registry/feature-registry.module.js');
require('../http.js');
require('../media-query.js');
require('../object-type.js');
require('../pagination/pagination.module.js');
require('../registry.js');
require('../session.js');
require('../websocket.js');

require('./list/item/user-notification-list-item.directive.js');
require('./list/user-notification-list.component.js');
require('./list/user-notification-list.controller.js');
require('./services/providers/user-notification-default.js');
require('./services/providers/user-notification-default-provider.service.js');
require('./services/providers/user-notification-providers.service.js');
require('./services/websocket/listener.service.js');
require('./services/user-notification.js');
require('./services/user-notification-counter.service.js');
require('./services/user-notification-severity.service.js');
require('./services/user-notification-state.service.js');
require('./services/user-notification.service.js');
require('./subheader/user-notification-subheader.component.js');
require('./templates/external/user-notification-external-template.directive.js');
require('./templates/simple/user-notification-simple-template.directive.js');
require('./templates/user-notification-template-provider-registry.service.js');
require('./toggler/user-notification-toggler.controller.js');
require('./toggler/user-notification-toggler.directive.js');
require('./user-notification-featureflip.run.js');
require('./user-notification.constants.js');
require('./user-notification.router.js');
require('./user-notification.run.js');
