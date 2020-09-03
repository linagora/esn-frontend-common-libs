const getAuthProvider = require('openpaas-auth-client').default;

const DEFAULT_PROVIDER = 'basic';

function getAuth(options) {
  return getAuthProvider(getProvider(), { ...getSettings(), ...options });
}

function getSettings() {
  if (typeof process.env.AUTH_PROVIDER_SETTINGS === 'string') {
    try {
      return JSON.parse(process.env.AUTH_PROVIDER_SETTINGS);
    } catch (error) {
      console.log('Cannot get configuration from AUTH_PROVIDER_SETTINGS environment variable');
      throw error;
    }
  }

  return process.env.AUTH_PROVIDER_SETTINGS;
}

function getProvider() {
  return process.env.AUTH_PROVIDER || DEFAULT_PROVIDER;
}

module.exports = { getAuth };
