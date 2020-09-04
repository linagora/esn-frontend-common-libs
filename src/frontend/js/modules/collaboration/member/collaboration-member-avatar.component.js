(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMemberAvatar', esnCollaborationMemberAvatar());

  function esnCollaborationMemberAvatar() {
    return {
      bindings: {
        member: '=',
        collaboration: '='
      },
      controller: 'ESNCollaborationMemberAvatarController',
      controllerAs: 'ctrl',
      template: require('./collaboration-member-avatar.pug')
    };
  }
})();
