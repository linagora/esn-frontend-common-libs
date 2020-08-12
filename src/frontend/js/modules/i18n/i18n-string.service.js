'use strict';

angular.module('esn.i18n')
  .factory('EsnI18nString', EsnI18nStringFactory);

function EsnI18nStringFactory($translate) {
  // TODO: Write tests for this (https://github.com/OpenPaaS-Suite/esn-frontend-common-libs/issues/83)
  function EsnI18nString(text, interpolateParams = {}, ignoreSanitizeStrategy = false) {
    this.text = text;
    this.interpolateParams = interpolateParams;
    this.ignoreSanitizeStrategy = ignoreSanitizeStrategy;

    return this;
  }

  EsnI18nString.prototype.toString = function() {
    if (this.translated) return this.translated;

    this.translated = this.ignoreSanitizeStrategy ?
      $translate.instant(this.text, this.interpolateParams, undefined, undefined, null) :
      $translate.instant(this.text, this.interpolateParams);

    return this.translated;
  };

  return EsnI18nString;
}
