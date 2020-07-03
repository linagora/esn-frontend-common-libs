(function() {
  'use strict';

  angular.module('esn.attachment')
    .component('esnAttachmentIcon', esnAttachmentIcon());

  function esnAttachmentIcon() {
    return {
      bindings: {
        type: '<'
      },
      controller: 'ESNAttachmentIconController',
      controllerAs: 'ctrl',
      template: require("./attachment-icon.pug")
    };
  }
})();
