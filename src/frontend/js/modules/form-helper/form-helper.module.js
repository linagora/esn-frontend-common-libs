(function(angular) {
  'use strict';

  angular.module('esn.form.helper', ['ngMessages', 'esn.core']);
})(angular);

require('../core.js');
require('../i18n/i18n.module.js');
require('./form-helper.directives.js');
require('./email-input/email-input.component.js');
require('./email-input/email-input.controller.js');
require('./filter-input/filter-input.component.js');
require('./filter-input/filter-input.controller.js');
