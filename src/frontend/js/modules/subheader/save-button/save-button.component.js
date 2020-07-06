require('./save-button.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.subheader')
    .component('esnSubheaderSaveButton', {
      template: require("./save-button.pug"),
      controller: 'esnSubheaderSaveButtonController',
      bindings: {
        onClick: '&',
        form: '<'
      }
    });
})(angular);
