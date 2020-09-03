require('./email-input.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.form.helper')
    .component('esnEmailInput', {
      template: require('./email-input.pug'),
      controller: 'esnEmailInputController',
      bindings: {
        email: '=',
        domainName: '<',
        form: '<',
        availabilityChecker: '&'
      }
    });
})(angular);
