(function(angular) {
  'use strict';

  angular.module('esn.home-page')
    .component('esnHomePage', {
      template: require("./home-page.pug"),
      bindings: {
        homePage: '=',
        availablePages: '<'
      }
    });
})(angular);
