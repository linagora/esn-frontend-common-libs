import jwtDecode from 'jwt-decode';

angular.module('esn.authentication', ['esn.http', 'ui.router'])
  .constant('authCallbackPath', '/auth/oidc/callback')
  .run(function($location, $window, authCallbackPath) {
    const currentLocation = {
      path: $location.path(),
      search: $location.search()
    };

    if (currentLocation.path !== authCallbackPath && currentLocation.path !== `${authCallbackPath}/`) {
      $window.localStorage.setItem('redirectToAfterAuth', JSON.stringify(currentLocation));
    }
  })
  .config(function($urlRouterProvider, authCallbackPath) {

    $urlRouterProvider.when(authCallbackPath, redirectAndCleanLocalStorage);
    $urlRouterProvider.when(`${authCallbackPath}/`, redirectAndCleanLocalStorage);

    function redirectAndCleanLocalStorage($location, $window) {

      const redirectToAfterAuth = JSON.parse($window.localStorage.getItem('redirectToAfterAuth'));

      $window.localStorage.removeItem('redirectToAfterAuth');

      if (redirectToAfterAuth) {
        $location.path(redirectToAfterAuth.path).search(redirectToAfterAuth.search);
      } else {
        return '/';
      }
    }
  })
  .factory('tokenAPI', function(esnRestangular, $log, esnAuth) {
    const cachedJWTToken = { promise: null, expirationTime: 0 };

    return {
      getWebToken
    };

    function getWebToken(reset = false) {
      return esnAuth.signInCompletePromise.then(() => (reset ? requestNewWebToken() : getCachedWebToken()));
    }

    function requestNewWebToken() {
      const jwtPromise = esnRestangular.one('jwt/generate').post();

      return jwtPromise
        .then(({ data: token }) => {
          // Expiration time claim not included? default to 0, meaning never expires
          const { exp = 0 } = jwtDecode(token);

          setJWTCache(jwtPromise, exp);

          return jwtPromise;
        })
        .catch(err => {
          $log.error(`An error occured while fetching the JWT: ${err}`);
          setJWTCache(null);
        });
    }

    function getCachedWebToken() {
      const { expirationTime, promise } = cachedJWTToken;

      // check if the cached token never expires.
      if (!expirationTime) return promise || requestNewWebToken();

      // check if we haven't reached the expiration time yet.
      // jwt exp claim is a NumericDate value that is defined as the number of seconds (not milliseconds) since Epoch.
      return expirationTime > Date.now() / 1000 ? promise : requestNewWebToken();
    }

    function setJWTCache(promise, expirationTime = 0) {
      cachedJWTToken.promise = promise;
      cachedJWTToken.expirationTime = expirationTime;
    }
  });

require('./http.js');
