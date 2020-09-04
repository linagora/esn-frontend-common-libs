// was collaborationMembershipRequestAcceptedNotification
(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembershipRequestAcceptedUserNotification', esnCollaborationMembershipRequestAcceptedUserNotification());

  function esnCollaborationMembershipRequestAcceptedUserNotification() {
    return {
      controller: 'CollaborationRequestMembershipActionUserNotificationController',
      controllerAs: 'ctrl',
      bindings: {
        notification: '='
      },
      template: require('./collaboration-membership-request-accepted.pug')
    };
  }
})();
