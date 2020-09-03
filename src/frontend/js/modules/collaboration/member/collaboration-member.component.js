(function(angular) {
  'use strict';

  angular.module('esn.collaboration').component('esnCollaborationMember', {
    bindings: {
      collaboration: '=',
      member: '='
    },
    controller: 'ESNCollaborationMemberController',
    controllerAs: 'ctrl',
    template: require('./collaboration-member.pug')
  });
})(angular);
