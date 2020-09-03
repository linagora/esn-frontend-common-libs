'use strict';

const { getAuth } = require('./client');

angular.module('esn.auth').factory('esnAuth', esnAuth);

function esnAuth($log, userAPI, httpConfigurer) {
  let auth;

  const onSignInComplete = data => {
    $log.debug('User signed in');
    data.headers && httpConfigurer.setHeaders(data.headers);
  };

  if (!auth) {
    auth = getAuth({
      fetchUser: userAPI.currentUser,
      onSignInComplete
    });

    auth.addEventListener('userSignedOut', () => {
      console.log('User signed out, redirecting to sign in...');
      auth.signin();
    });

    auth.addEventListener('sessionExpiring', () => {
      $log.debug('Session is expiring');
    });

    auth.addEventListener('sessionExpired', () => {
      $log.debug('Session expired, force authentication');
      auth.signin();
    });
  }

  return auth;
}
