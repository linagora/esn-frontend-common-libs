(function(anggular) {
'use strict';

  angular.module('esn.profile-menu', [
    'material.components.button',
    'material.components.menu',
    'material.components.icon',
    'esn.session',
    'esn.avatar'
  ]);
})(angular);

require('../../avatar.js');
require('../../session.js');
require('./profile-menu.component.js');
require('./profile-menu.config.js');
require('./profile-menu.controller.js');
