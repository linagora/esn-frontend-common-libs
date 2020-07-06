require('./attachments-selector.controller.js');

(function(angular) {
  'use strict';

  angular
    .module('esn.attachments-selector')
    .component('esnAttachmentsSelector', {
      template: require("../../../views/modules/attachments-selector/attachments-selector.pug"),
      controller: 'esnAttachmentsSelectorController',
      bindings: {
        attachments: '<?',
        attachmentType: '<?',
        attachmentFilter: '<?',
        onAttachmentsUpdate: '&?',
        uploadAttachments: '&?',
        attachmentHolder: '=?'
      }
    });
})(angular);
