(function(angular) {
  'use strict';

  angular.module('esn.user', [
    'esn.http',
    'esn.object-type',
    'esn.session',
    'esn.attendee',
    'esn.cache',
    'esn.constants'
  ]);
})(angular);

require('../../constants.js');
require('../attendee/attendee.module.js');
require('../cache.js');
require('../http.js');
require('../object-type.js');
require('../session.js');
require('./users-autocomplete-input/users-autocomplete-input.directive.js');
require('./user-api.service.js');
require('./user-utils.service.js');
require('./user.constants.js');
require('./user.run.js');
require('./username.service.js');
