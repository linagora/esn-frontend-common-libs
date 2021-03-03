const getAuthProvider = require('openpaas-auth-client').default;

const DEFAULT_PROVIDER = 'basic';

function getAuth(options, config) {
  return getAuthProvider(getProvider(config), {
    ...getSettings(config),
    ...options
  });
}

function getSettings(config) {
  if (config && config.AUTH_PROVIDER_SETTINGS) {
    return config.AUTH_PROVIDER_SETTINGS;
  }

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

function getProvider(config) {
  if (config && config.AUTH_PROVIDER) {
    return config.AUTH_PROVIDER;
  }

  if (process.env.AUTH_PROVIDER) {
    return process.env.AUTH_PROVIDER;
  }

  return DEFAULT_PROVIDER;
}

module.exports = { getAuth };
