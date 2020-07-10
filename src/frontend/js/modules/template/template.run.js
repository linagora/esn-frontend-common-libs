(function(angular) {
  'use strict';

  angular.module('esn.template').run(templateCacheBlock);

  function templateCacheBlock($templateCache) {
    $templateCache.put('/views/commons/loading.html', require('../../../views/commons/loading.pug'));
    $templateCache.put('/views/commons/loading-error.html', require('../../../views/commons/loading-error.pug'));
    $templateCache.put('/views/esn/partials/application.html', require('../../../views/esn/partials/application.pug'));
  }
})(angular);
