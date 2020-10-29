angular.module('esn.authentication', ['esn.http'])
  .factory('tokenAPI', function(esnRestangular) {

    // https://github.com/linagora/openpaas-esn/blob/master/backend/core/auth/token.js#L3
    // token TTL is 60 seconds server-side. We keep a lower value to get over
    // network lags
    const SERVER_TTL = 60 * 1000;
    const NETWORK_LAG = 15 * 1000;
    const CACHE_MAX_TTL = SERVER_TTL - NETWORK_LAG;
    const cachedToken = { promise: null, timestamp: 0 };

    return {
      getNewToken
    };

    function getNewToken(resetCache = false) {
      return resetCache ? getTokenNoCache() : getCachedToken();
    }

    function getCachedToken() {
      const { promise, timestamp } = getCache();

      return timestamp + CACHE_MAX_TTL > Date.now() ? promise : getTokenNoCache();
    }

    function getTokenNoCache() {
      setCache(esnRestangular.one('authenticationtoken').get(), Date.now());

      cachedToken.promise.catch(() => {
        setCache(null);
      });

      return cachedToken.promise;
    }

    function setCache(promise, timestamp = 0) {
      cachedToken.promise = promise;
      cachedToken.timestamp = timestamp;
    }

    function getCache() {
      return cachedToken;
    }
  });

require('./http.js');
