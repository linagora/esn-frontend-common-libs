(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationEditForm', {
      bindings: {
        application: '<'
      },
      controller: 'ESNOauthApplicationEditFormController',
      template: require('./oauth-application-edit-form.pug')
    });
})();
