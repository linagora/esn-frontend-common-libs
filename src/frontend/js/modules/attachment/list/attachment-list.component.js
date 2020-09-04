require('./attachment-list.controller.js');

(function(angular) {
  'use strict';

  angular.module('esn.attachment-list')
    .component('esnAttachmentList', esnAttachmentList());

  function esnAttachmentList() {
    return {
      template: require('./attachment-list.pug'),
      controller: 'ESNAttachmentListController',
      controllerAs: 'ctrl',
      bindings: {
        objectType: '@',
        id: '@',
        elementsPerPage: '=?',
        scrollInsideContainer: '@?'
      }
    };
  }
})(angular);
