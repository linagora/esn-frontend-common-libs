import { UserManager } from 'oidc-client';

class OIDCStrategy {
  constructor(options) {
    this.oidcUserManager = new UserManager(options);
    this.oidcUserManager.getUser().then(user => {
      this.user = user;
    });

    const userManagerEvents = [
      'addUserLoaded',
      'addUserUnloaded',
      'addAccessTokenExpiring',
      'addAccessTokenExpired',
      'addSilentRenewError',
      'addUserSignedOut'
    ]
    userManagerEvents.forEach(eventName => {
      this.oidcUserManager.events[eventName](data => {
        console.log('Event occured', eventName, data);
      });
    });
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

  completeAuthentication() {
    return this.oidcUserManager.signinRedirectCallback()
      .then(user => {
        this.user = user;
        return this.user;
      });
  }
}

export default OIDCStrategy;
