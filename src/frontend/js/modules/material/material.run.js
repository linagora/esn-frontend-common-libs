'use strict';

angular.module('esn.material')
  .config(cacheTemplate);

function cacheTemplate($templateCache) {
  $templateCache.put('images/mdi/mdi.svg', require('../../../images/mdi/mdi.svg'));
}
