'use strict';

angular.module('esn.box-overlay')
  .run(addTemplateCache);

function addTemplateCache($templateCache) {
  $templateCache.put('/views/modules/box-overlay/box-overlay.html', require('./box-overlay.pug'));
}
