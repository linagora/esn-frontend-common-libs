require('./clipboard-url.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.clipboard')
    .component('esnClipboardUrl', {
      bindings: {
        url: '<'
      },
      template: require("./clipboard-url.pug"),
      controller: 'esnClipboardUrlController',
      controllerAs: 'ctrl'
    });
})(angular);
