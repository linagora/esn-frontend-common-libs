(function(angular) {
  'use strict';

  angular.module('esn.datetime', [
    'esn.configuration',
    'esn.form.helper'
  ]);
})(angular);

require('../config/config.module.js');
require('../form-helper/form-helper.module.js');
require('./datetime-date-formater.filter.js');
require('./datetime.component.js');
require('./datetime.constants.js');
require('./datetime.run.js');
require('./datetime.service.js');
require('./date-picker/date-picker.component.js');
require('./date-picker/date-picker.controller.js');
require('./time-zone-selector/time-zone-selector.component.js');
require('./time-zone-selector/time-zone-selector.constants.js');
require('./time-zone-selector/time-zone-selector.controller.js');
require('./timeformat-selector/timeformat-selector.component.js');
require('./timeformat-selector/timeformat-selector.controller.js');
