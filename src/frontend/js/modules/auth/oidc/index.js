import OIDCStrategy from './strategy';

const URL_PATTERN = /auth\/oidc\/callback/;

class OIDCAuth {
  constructor(options = {}) {
    this.options = options;
    this.strategy = new OIDCStrategy(options);
  }

  init() {
    // URL may be updated before now and the strategy.init promise resolution...
    const currentUrl = window.location.href;

    return this.strategy.init()
      .then(() => {
        if (currentUrl.match(URL_PATTERN)) {
          return this.strategy.completeAuthentication(currentUrl)
            .then(() => this._onLoggedIn());
        }

        if (!this.strategy.isLoggedIn()) {
          return false;
        }

        return this._onLoggedIn();
      });
  }

  _onLoggedIn() {
    this.options.onLogin && this.options.onLogin({ headers: { Authorization: this.strategy.getAuthorizationHeaderValue()}});

    return this.getUser();
  }

  login() {
    return this.strategy.startAuthentication();
  }

  getUser() {
    return this.strategy.getUser();
  }
}

export default OIDCAuth;
