'use strict';

angular.module('esn.profile-menu', [
  'material.components.menu',
  'esn.session',
  'esn.avatar'
]);

require('../../avatar.js');
require('../../session.js');
require('./profile-menu.component.js');
require('./profile-menu.controller.js');
