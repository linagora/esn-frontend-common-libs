(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationAddForm', {
      bindings: {
        onCreated: '&'
      },
      controller: 'ESNOauthApplicationAddFormController',
      template: require('./oauth-application-add-form.pug')
    });
})();
