(function() {
  'use strict';

  angular.module('esn.oauth-application')
    .component('esnOauthApplicationList', {
      controller: 'ESNOauthApplicationListController',
      template: require("./oauth-application-list.pug")
    });
})();
