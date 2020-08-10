'use strict';

angular.module('linagora.esn.account', [
  'esn.router',
  'op.dynamicDirective',
  'esn.core',
  'esn.ui',
  'esn.http',
  'esn.notification',
  'linagora.esn.oauth.consumer'
]);

require('../../../../frontend/js/modules/esn.router.js');
require('../../../../frontend/components/dynamic-directive/src/dynamic-directive.js');
require('../../../../frontend/js/modules/core.js');
require('../../../../frontend/js/modules/ui.js');
require('../../../../frontend/js/modules/http.js');
require('../../../../frontend/js/modules/notification.js');
require('../../../linagora.esn.oauth.consumer');
require('./app.routes.js');
require('./app.config.js');
require('./app.run.js');
require('./constants.js');
require('./controllers.js');
require('./directives.js');
require('./services.js');
