(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembersList', esnCollaborationMembersList());

  function esnCollaborationMembersList() {
    return {
      template: require('./collaboration-members-list.pug'),
      controller: 'ESNCollaborationMembersListController',
      controllerAs: 'ctrl',
      bindings: {
        collaboration: '=',
        elementsPerPage: '=?',
        objectTypeFilter: '@?',
        scrollInsideContainer: '@?'
      }
    };
  }
})();
