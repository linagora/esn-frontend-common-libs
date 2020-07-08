require('./i18n-language-selector.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.i18n')
    .component('esnI18nLanguageSelector', {
      template: require("./i18n-language-selector.pug"),
      bindings: {
        language: '=',
        mode: '@'
      },
      controller: 'esnI18nLanguageSelectorController'
    });
})(angular);
