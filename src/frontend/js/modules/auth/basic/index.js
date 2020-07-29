/**
 * Basic Auth plugin.
 */
class BasicAuth {
  constructor(options = {
    loginPath: '/login',
    logoutPath: '/logout',
    fetchUser: null
  }) {
    this.loginPath = options.loginPath || '/login';
    this.logoutPath = options.logoutPath || '/logout';
    this.fetchUser = options.fetchUser;

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