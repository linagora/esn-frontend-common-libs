(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationCard', {
      bindings: {
        application: '<'
      },
      template: require('./oauth-application-card.pug')
    });
})();
