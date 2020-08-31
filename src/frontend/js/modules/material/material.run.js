'use strict';

angular.module('esn.material')
  .run(cacheTemplate);

function cacheTemplate($templateCache) {
  $templateCache.put('images/mdi/mdi.svg', require('../../../images/mdi/mdi.svg'));
}
