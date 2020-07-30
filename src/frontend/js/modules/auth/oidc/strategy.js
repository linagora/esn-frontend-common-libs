import { UserManager } from 'oidc-client';

class OIDCStrategy {
  constructor(options) {
    this.oidcUserManager = new UserManager(options);
  }

  init() {
    const userManagerEvents = [
      'addUserLoaded',
      'addUserUnloaded',
      'addAccessTokenExpiring',
      'addAccessTokenExpired',
      'addSilentRenewError',
      'addUserSignedOut'
    ]
    userManagerEvents.forEach(eventName => {
      console.log('Adding event listener', eventName);
      this.oidcUserManager.events[eventName](data => {
        console.log('Event occured', eventName, data);
      });
    });

    return this.oidcUserManager.getUser()
      .then(user => (this.user = user));
  }

  isLoggedIn() {
    return this.user != null && !this.user.expired;
  }

  getClaims() {
    return this.user.profile;
  }

  getUser() {
    return this.user;
  }

  getAuthorizationHeaderValue() {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication() {
    return this.oidcUserManager.signinRedirect();
  }

  completeAuthentication(url) {
    return this.oidcUserManager.signinRedirectCallback(url)
      .then(user => this.user = user);
  }
}

export default OIDCStrategy;
