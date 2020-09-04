(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembersAdd', esnCollaborationMembersAdd());

  function esnCollaborationMembersAdd() {
    return {
      template: require('./collaboration-members-add.pug'),
      controller: 'ESNCollaborationMembersAddController',
      controllerAs: 'ctrl',
      bindings: {
        collaboration: '=',
        objectType: '=',
        elementsPerPage: '@?',
        scrollInsideContainer: '@?',
        options: '='
      }
    };
  }
})();
