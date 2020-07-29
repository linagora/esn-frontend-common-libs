import OIDCStrategy from './strategy';

class OIDCAuth {
  constructor(options = {}) {
    this.options = options;
    this.strategy = new OIDCStrategy(options);
  }

  init() {
    if (window.location.href.match(/\/auth\/oidc\/callback/)) {
      return this.strategy.completeAuthentication().then(user => {
        this.onLoggedIn();

        return user;
      });
    }

    if (!this.strategy.isLoggedIn()) {
      return Promise.resolve();
    }

    this.onLoggedIn();
    return Promise.resolve(this.getUser())
  }

  onLoggedIn() {
    this.options.onLogin && this.options.onLogin({ headers: { Authorization: this.strategy.getAuthorizationHeaderValue()}});
  }

  login() {
    return this.strategy.startAuthentication();
  }

  getUser() {
    return this.strategy.getUser();
  }
}

export default OIDCAuth;
