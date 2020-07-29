const DEFAULT_PROVIDER = 'basic';
const DEFAULT_SETTINGS = {
  oidc: {
    authority: 'http://localhost:8888/auth/realms/master',
    client_id: 'openpaas-spa',
    redirect_uri: 'http://localhost:9900/#/auth/oidc/callback',
    post_logout_redirect_uri: 'http://localhost:9900/',
    response_type: "id_token token",
    scope: "openid email profile"
  },
  basic: {
    loginPath: '/login',
    logoutPath: '/logout'
  }
}

function getSettings(type) {
  return (typeof(process.env.AUTH_PROVIDER_SETTINGS) === 'string' ? JSON.parse(process.env.AUTH_PROVIDER_SETTINGS) : process.env.AUTH_PROVIDER_SETTINGS) || DEFAULT_SETTINGS[type];
}

function getProvider() {
  return process.env.AUTH_PROVIDER || DEFAULT_PROVIDER;
}

export {
  getSettings,
  getProvider
};
