const Client = require('esn-api-client/src/Client');

angular.module('esn.api-client', [])
  .factory('esnApiClient', function($q, $window) {
    const ESNApiClient = Client.default;

    return new ESNApiClient({ baseURL: $window.location.origin, customPromise: $q });
  });
