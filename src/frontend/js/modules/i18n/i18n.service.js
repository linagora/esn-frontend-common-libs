require('./i18n.constants.js');
require('./i18n-string.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.i18n')
    .factory('esnI18nService', function($translate, EsnI18nString, esnConfig, ESN_I18N_DEFAULT_LOCALE, ESN_I18N_DEFAULT_FULL_LOCALE, ESN_I18N_FULL_LOCALE) {
      return {
        getLocale: getLocale,
        getFullLocale: getFullLocale,
        translate: translate,
        isI18nString: isI18nString
      };

      function getLocale() {
        return $translate.use() || $translate.preferredLanguage() || ESN_I18N_DEFAULT_LOCALE;
      }

      function getFullLocale(callback) {
        return esnConfig('core.language', ESN_I18N_DEFAULT_LOCALE)
        .then(function(locale) {
          var fullLocale = ESN_I18N_FULL_LOCALE.hasOwnProperty(locale) ? ESN_I18N_FULL_LOCALE[locale] : ESN_I18N_DEFAULT_FULL_LOCALE;

          return callback && typeof callback === 'function' ? callback(fullLocale) : fullLocale;
        });
      }

      function translate(text) {
        if (!text || text instanceof EsnI18nString) {
          return text;
        }

        if (typeof text === 'string') {
          var params = (arguments.length > 1) ? Array.prototype.slice.call(arguments).slice(1) : [];

          return new EsnI18nString(text, params);
        }

        throw new TypeError('The input text must be a string or an EsnI18nString object');
      }

      function isI18nString(text) {
        return text instanceof EsnI18nString;
      }
    })

    /**
     * When the value of a dynamic translated text (%s) is relied on the result of a function
     * We'll watch the translated text when it changed by the `get` method of Object.defineProperty
     * The `get` method should return the updated value
     *
     * @param {Object} object         Base object to add property
     * @param {Object} property       Name of property to watch
     * @param {Function} callback     Function ran every time we get property value
    */
    .factory('watchDynamicTranslatedValue', function() {
      return function(object, propertyName, callback) {
        Object.defineProperty(object, propertyName, {
          get() { return callback(); }
        });
      }
    });
})(angular);
