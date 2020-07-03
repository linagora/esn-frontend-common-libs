(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembershipRequestsActions', esnCollaborationMembershipRequestsActions());

  function esnCollaborationMembershipRequestsActions() {
    return {
      bindings: {
        objectType: '@',
        collaboration: '=',
        user: '='
      },
      controller: 'ESNCollaborationMembershipRequestsActionsController',
      controllerAs: 'ctrl',
      template: require("./collaboration-membership-requests-actions.pug")
    };
  }
})();
