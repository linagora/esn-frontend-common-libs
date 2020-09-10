const Client = require('esn-api-client/src/Client').default;

angular.module('esn.api-client', [])
  .factory('esnApiClient', function($q, $window) {
    return new Client({ baseURL: $window.location.origin, customPromise: $q });
  });
