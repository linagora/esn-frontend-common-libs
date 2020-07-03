(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationAddFormModal', {
      bindings: {
        onCreated: '&'
      },
      template: require("./oauth-application-add-form-modal.pug")
    });
})();
