(function() {
  'use strict';

  angular.module('esn.attachment-list')
    .component('esnAttachmentListItem', esnAttachmentListItem());

    function esnAttachmentListItem() {
      return {
        template: require("./attachment-list-item.pug"),
        controllerAs: 'ctrl',
        bindings: {
          attachment: '<'
        }
      };
    }
})();
