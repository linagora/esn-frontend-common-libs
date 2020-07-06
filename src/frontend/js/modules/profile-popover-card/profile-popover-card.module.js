
(function(angular) {
  'use strict';

  angular.module('esn.profile-popover-card', [
    'uuid4',
    'esn.avatar',
    'esn.session',
    'matchmedia-ng',
    'esn.media.query',
    'esn.touchscreen-detector'
  ]);
})(angular);

require('../avatar.js');
require('../media-query.js');
require('../session.js');
require('../touchscreen-detector.js');
require('./profile-popover-content/profile-popover-content.component.js');
require('./profile-popover-content/profile-popover-content.controller.js');
require('./profile-popover-card.directive.js');
require('./profile-popover-card.service.js');
