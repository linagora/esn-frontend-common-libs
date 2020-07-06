(function(angular) {
  'use strict';

  angular.module('esn.attachment')
    .component('esnAttachmentDefaultPreview', {
      bindings: {
        attachment: '<'
      },
      template: require("./default-preview.pug")
    });
})(angular);
