const _ = require('lodash');

require('./constants.js');
require('./services.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.oauth.consumer')
    .run(function(oauthStrategyRegistry, SUPPORTED_ACCOUNT_TYPES, oauthWorkflow) {
      _.forIn(SUPPORTED_ACCOUNT_TYPES, function(item) {
        oauthStrategyRegistry.register(item, function() {
          oauthWorkflow.redirect(['oauth', item, 'connect'].join('/'));
        });
      });
    });
})(angular);
