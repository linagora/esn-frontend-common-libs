require('../http.js');

(function(angular) {
  'use strict';

  angular.module('esn.i18n')
    .factory('esnI18nLoader', esnI18nLoader);

  function esnI18nLoader($http, $q, httpConfigurer) {
    var getCatalogsPromise;

    return function(options) {
      if (!getCatalogsPromise) {
        getCatalogsPromise = getCatalogs();
      }

      return getCatalogsPromise
        .then(function(catalogs) {
          if (!catalogs[options.key]) {
            return $q.reject(Error('No catalog found for ' + options.key));
          }

          return catalogs[options.key];
        });
    };

    function getCatalogs() {
      // TODO: Write tests for this (https://github.com/OpenPaaS-Suite/esn-frontend-common-libs/pull/79)
      const url = httpConfigurer.getUrl('/api/i18n');

      return $http.get(url).then(function(res) {
        return res.data;
      });
    }
  }
})(angular);
