(function() {
  'use strict';

  angular.module('esn.attachment')
    .directive('esnAttachmentDefaultViewer', esnAttachmentDefaultViewer);

  function esnAttachmentDefaultViewer() {
    return {
      restrict: 'E',
      scope: {
        attachment: '=',
        viewer: '='
      },
      template: require("./default-viewer.pug")
    };

  }
})();
