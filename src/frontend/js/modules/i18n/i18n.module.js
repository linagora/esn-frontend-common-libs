'use strict';

angular.module('esn.i18n', [
  'pascalprecht.translate',
  'angularMoment',
  'esn.configuration',
  'ngCookies'
]);

require('../config/config.module.js');
require('./language-selector/i18n-language-selector.component.js');
require('./language-selector/i18n-language-selector.controller.js');
require('./i18n-dateformat.service.js');
require('./i18n-interpolator.service.js');
require('./i18n-loader.service.js');
require('./i18n-string.service.js');
require('./i18n.config.js');
require('./i18n.constants.js');
require('./i18n.filter.js');
require('./i18n.run.js');
require('./i18n.service.js');
