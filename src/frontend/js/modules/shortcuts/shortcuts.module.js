(function(angular) {
  'use strict';

  angular.module('esn.shortcuts', [
    'cfp.hotkeys',
    'mgcrea.ngStrap.modal',
    'ng.deviceDetector',
    'ui.router',
    'esn.i18n'
  ]);
})(angular);

require('../i18n/i18n.module.js');
require('./sheet/shortcuts-sheet.controller.js');
require('./sheet/shortcuts-sheet.service.js');
require('./shortcuts-action.service.js');
require('./shortcuts-global.service.js');
require('./shortcuts-registry.service.js');
require('./shortcuts.config.js');
require('./shortcuts.constants.js');
require('./shortcuts.run.js');
require('./shortcuts.service.js');
