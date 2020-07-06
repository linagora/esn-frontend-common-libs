require('./date-picker.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.datetime')
    .component('esnDatePicker', {
      template: require("./date-picker.pug"),
      bindings: {
        ngModel: '=',
        ngChange: '&',
        ngBlur: '&',
        ngFocus: '&',
        ngClick: '&',
        className: '@',
        ngDisabled: '=',
        options: '@',
        label: '@',
        placeholder: '@',
        size: '@',
        isAllDay: '=',
        minDate: '@',
        dateFormat: '@',
        autoclose: '@',
        startWeek: '@',
        customAttributes: '<'
      },
      controller: 'esnDatetimeDatePickerController'
    });
})(angular);
