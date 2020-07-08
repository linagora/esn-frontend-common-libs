(function(angular) {
  'use strict';

  angular.module('esn.attendee', [
    'esn.people'
  ]);
})(angular);

require('../people/people.module.js');
require('./attendee.constants.js');
require('./attendee.run.js');
require('./attendee.service.js');
