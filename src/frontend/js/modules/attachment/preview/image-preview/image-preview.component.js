(function(angular) {
  'use strict';

  angular.module('esn.attachment')
    .component('esnAttachmentImagePreview', {
      bindings: {
        attachment: '<'
      },
      template: require('./image-preview.pug')
    });
})(angular);
