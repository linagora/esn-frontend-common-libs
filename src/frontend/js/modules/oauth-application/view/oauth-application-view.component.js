(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationView', {
      controller: 'ESNOauthApplicationViewController',
      template: require("./oauth-application-view.pug")
    });
})();
