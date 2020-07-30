export const DEFAULT_PROVIDER = 'basic';

export const DEFAULT_SETTINGS = {
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