import { getSettings, getProvider } from './settings';
import OIDCAuth from './oidc/index';
import BasicAuth from './basic/index';

const AUTHS = {
  oidc: OIDCAuth,
  basic: BasicAuth
}

function getAuth(options = {}) {
  const provider = getProvider();
  const Auth = AUTHS[provider];

  return new Auth({...getSettings(provider), ...options});
}

export { getAuth };
