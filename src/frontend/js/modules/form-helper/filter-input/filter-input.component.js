require('./filter-input.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.form.helper')

    .component('esnFilterInput', {
      template: require("./filter-input.pug"),
      bindings: {
        onChange: '&',
        onBlur: '&',
        autoFocusInput: '@',
        filter: '<',
        placeholder: '@',
        variant: '@?'
      },
      controller: 'esnFilterInputController'
    });

})(angular);
