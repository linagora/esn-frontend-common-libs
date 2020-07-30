import getAuthProvider from 'openpaas-auth-client';
import { getSettings, getProvider } from './settings';

function getAuth(options) {
  return getAuthProvider(getProvider(), { ...getSettings(), ...options });
}

export { getAuth };
