require('../../attachment-registry.service.js');
require('./image-preview.constant.js');

(function(angular) {
  'use strict';

  angular.module('esn.attachment')
    .run(function(esnAttachmentRegistryService, ESN_ATTACHMENT_IMAGE_PREVIEW) {
      esnAttachmentRegistryService.addPreviewer(ESN_ATTACHMENT_IMAGE_PREVIEW);
    });
})(angular);
