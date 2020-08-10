'use strict';

require('./i18n.service.js');
require('./i18n.constants');

angular.module('esn.i18n')
  .run(setMomentLocale)
  .run(settingLanguage);

function setMomentLocale(amMoment, esnI18nService) {
  amMoment.changeLocale(esnI18nService.getLocale());
}

function settingLanguage($cookies, $translate, esnConfig, ESN_I18N_DEFAULT_LOCALE) {
  esnConfig('core.language')
    .then(function(language) {
      $cookies.locale = language;
      $translate.use(language);
    })
    .catch(function() {
      $cookies.locale = ESN_I18N_DEFAULT_LOCALE;
    });
}
