'use strict';

angular.module('esnApp')
  .config(function(tmhDynamicLocaleProvider) {

    tmhDynamicLocaleProvider.localeLocationPattern('/i18n/angular-locale_{{locale}}.js');
  })
  // don't remove $state from here or ui-router won't route...
  .run(function(session, ioConnectionManager, $state) { // eslint-disable-line
    session.ready.then(function() {
      ioConnectionManager.connect();
    });
  });
