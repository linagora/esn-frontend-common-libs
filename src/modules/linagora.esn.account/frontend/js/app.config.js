const _ = require('lodash');

require('./constants.js');
require('./services.js');

(function(angular) {
  'use strict'

  angular.module('linagora.esn.account')
    .config(config)

  function config($stateProvider, routeResolver) {
    $stateProvider.state('controlcenter.accounts', {
      url: '/accounts',
      templateUrl: '/account/views/accounts',
      controller: 'accountListController',
      resolve: {
        domain: routeResolver.session('domain'),
        user: routeResolver.session('user'),
        accounts: function($log, accountService) {
          return accountService.getAccounts().then(function(response) {
            return response.data;
          }, function(err) {
            $log.error('Error while getting accounts', err);
          });
        },
        providers: function($log, accountService, SUPPORTED_ACCOUNT_TYPES) {
          return accountService.getAccountProviders()
            .then(function(resp) {
              return _.intersection(resp.data, _.values(SUPPORTED_ACCOUNT_TYPES));
            })
            .catch(function(err) {
              $log.error('Error while getting account providers', err);
            });
        }
      }
    });
  }
})(angular);
