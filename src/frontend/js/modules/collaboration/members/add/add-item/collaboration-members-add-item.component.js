(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembersAddItem', esnCollaborationMembersAddItem());

  function esnCollaborationMembersAddItem() {
    return {
      template: require('./collaboration-members-add-item.pug'),
      controller: 'ESNCollaborationMembersAddItemController',
      controllerAs: 'ctrl',
      bindings: {
        member: '=',
        objectType: '=',
        collaboration: '='
      }
    };
  }
})();
