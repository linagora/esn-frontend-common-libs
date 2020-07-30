/**
 * Basic Auth plugin.
 */
class BasicAuth {
  constructor({ loginPath = '/login', logoutPath = '/logout', fetchUser = null } = {}) {
    this.loginPath = loginPath;
    this.logoutPath = logoutPath;
    this.fetchUser = fetchUser;

    if (!this.fetchUser) {
      throw new Error('fetchUser is required');
    }
  }

  login() {
    window.location = `${this.loginPath}?continue=${window.location.hash}`;
    return Promise.resolve();
  }

  logout() {
    window.location = this.options.logoutPath;
  }

  init() {
    return this.fetchUser().then(user => {
      this.user = user;
      return this.user;
    }).catch(() => {
      return false;
    });
  }

  isAuthenticated() {
    return !!this.user;
  }
}

export default BasicAuth;