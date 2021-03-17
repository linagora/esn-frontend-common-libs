require('./datetime.service.js');
(function(angular) {

  'use strict';

  angular.module('esn.datetime')

    .run(run);

  function run(moment, esnDatetimeService, tmhDynamicLocale, esnConfig, tmhDynamicLocaleCache) {
    esnDatetimeService.init().then(function() {
      moment.tz.setDefault(esnDatetimeService.getTimeZone());
      esnConfig('core.language').then(function(config) {
        changeLanguageDynamically(config);
      });
    });

    function getInjectedLocale() {
      var localInjector = angular.injector(['ngLocale']);

      return localInjector.get('$locale');
    }
    function changeLanguageDynamically(config) {

      // put en language into cache
      require('angular-i18n/en');
      tmhDynamicLocaleCache.put('en', getInjectedLocale());

      // put fr language into cache
      require('angular-i18n/fr');
      tmhDynamicLocaleCache.put('fr', getInjectedLocale());

      // put vi language into cache
      require('angular-i18n/vi');
      tmhDynamicLocaleCache.put('vi', getInjectedLocale());

      // put zh language into cache
      require('angular-i18n/zh');
      tmhDynamicLocaleCache.put('zh', getInjectedLocale());

      // put ru language into cache
      require('angular-i18n/ru');
      tmhDynamicLocaleCache.put('ru', getInjectedLocale());

      // set default language
      tmhDynamicLocale.set(config);
    }

  }
})(angular);
