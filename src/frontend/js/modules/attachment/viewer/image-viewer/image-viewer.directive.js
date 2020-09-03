(function(angular) {
  'use strict';

  angular.module('esn.attachment')
    .directive('esnAttachmentImageViewer', esnAttachmentImageViewer);

  function esnAttachmentImageViewer() {
    return {
      restrict: 'E',
      scope: {
        attachment: '=',
        viewer: '='
      },
      template: require('./image-viewer.pug')
    };
  }
})(angular);
