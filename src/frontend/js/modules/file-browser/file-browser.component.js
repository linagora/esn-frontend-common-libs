require('./file-browser.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.file-browser')
    .component('esnFileBrowser', {
      template: require('./file-browser.pug'),
      bindings: {
        loadNode: '&',
        selectedNodes: '=',
        options: '<'
      },
      controller: 'esnFileBrowserController'
    });
})(angular);
