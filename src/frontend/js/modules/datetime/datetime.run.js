require('./datetime.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.datetime')
    .config(function(tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/i18n/angular-locale_{{locale}}.js');
    })
    .run(run);

  function run(moment, esnDatetimeService, tmhDynamicLocale, esnConfig) {
    esnDatetimeService.init().then(function() {
      moment.tz.setDefault(esnDatetimeService.getTimeZone());
      esnConfig('core.language').then(function(config) {
        tmhDynamicLocale.set(config);
      });
    });
  }
})(angular);
