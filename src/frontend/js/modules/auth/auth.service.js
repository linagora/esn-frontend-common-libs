'use strict';

const { getAuth } = require('./client');

angular.module('esn.auth').factory('esnAuth', esnAuth);

function esnAuth($q, $log, $window, userAPI, httpConfigurer) {
  let auth;
  const signInCompleteDeferred = $q.defer();
  const onSignInComplete = data => {
    $log.debug('esn.auth - User signed in');
    if (data.headers) {
      httpConfigurer.setHeaders(data.headers);
      signInCompleteDeferred.resolve();
    }
  };

  if (!auth) {
    auth = getAuth({
      fetchUser: userAPI.currentUser,
      onSignInComplete
    }, $window.openpaas);

    auth.addEventListener('userSignedOut', () => {
      $log.info('esn.auth - User signed out, redirecting to sign in...');
      auth.signin();
    });

    auth.addEventListener('sessionExpiring', () => {
      $log.info('esn.auth - Session is expiring');
    });

    auth.addEventListener('silentRenewError', err => {
      $log.info('esn.auth - Silent renew error', err);
    });

    auth.addEventListener('sessionExpired', () => {
      if (!auth.willRenewSession()) {
        $log.info('esn.auth - Session expired, force signin');

        return auth.signin();
      }

      $log.info('esn.auth - Session expired, waiting for auth to renew it');
    });
  }

  auth.signInCompletePromise = signInCompleteDeferred.promise;

  return auth;
}
