(function(angular) {
  'use strict';

  angular.module('esn.search', [
    'esn.aggregator',
    'esn.application-menu',
    'esn.i18n',
    'esn.provider',
    'op.dynamicDirective',
    'angularMoment',
    'ui.router',
    'material.components.select',
    'material.components.panel'
  ]);

})(angular);

require('../application-menu.js');
require('../aggregator.js');
require('../i18n/i18n.module.js');
require('../provider.js');
require('./context/search-context.service.js');
require('./form/advanced/search-advanced-form.component.js');
require('./form/advanced/search-advanced-form.controller.js');
require('./form/advanced/search-advanced-toggle-button.component.js');
require('./form/advanced/search-advanced-toggle-button.controller.js');
require('./form/search-form.directive.js');
require('./header/search-header.component.js');
require('./header/search-header.controller.js');
require('./provider-select/search-provider-select.component.js');
require('./provider-select/search-provider-select.controller.js');
require('./query/search-query.service.js');
require('./result/search-result-item.component.js');
require('./result/search-result-item.controller.js');
require('./result/search-result-size-formatter.service.js');
require('./result/search-result.component.js');
require('./result/search-result.controller.js');
require('./sub-header/sub-header.directive.js');
require('./application-menu.directive.js');
require('./search-provider.service.js');
require('./search-providers.service.js');
require('./search.constants.js');
require('./search.router.js');
require('./search.service.js');
