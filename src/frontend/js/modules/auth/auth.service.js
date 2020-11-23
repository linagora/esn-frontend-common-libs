'use strict';

const { getAuth } = require('./client');

angular.module('esn.auth').factory('esnAuth', esnAuth);

function esnAuth($log, userAPI, httpConfigurer) {
  let auth;

  const onSignInComplete = data => {
    $log.debug('esn.auth - User signed in');
    data.headers && httpConfigurer.setHeaders(data.headers);
  };

  if (!auth) {
    auth = getAuth({
      fetchUser: userAPI.currentUser,
      onSignInComplete
    });

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

  return auth;
}
