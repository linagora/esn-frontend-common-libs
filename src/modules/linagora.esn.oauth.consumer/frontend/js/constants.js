(function(angular) {
  'use strict';

  angular.module('linagora.esn.oauth.consumer')
    .constant('SUPPORTED_ACCOUNT_TYPES', {
      twitter: 'twitter',
      google: 'google',
      github: 'github'
    });
})(angular);
