import { getSettings } from './settings';
import OIDCAuth from './oidc/index';
import BasicAuth from './basic/index';

const AUTHS = {
  oidc: OIDCAuth,
  basic: BasicAuth
}

function getAuth(options = {}) {
  const authType = getAuthType();
  const Auth = AUTHS[authType];

  return new Auth({...getSettings(authType), ...options});
}

// TODO: get from env
function getAuthType() {
  return 'basic';
}

export { getAuth };