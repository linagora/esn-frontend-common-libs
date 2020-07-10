(function(angular) {
  'use strict';

  angular.module('linagora.esn.user-status')
    .component('userStatusBubble', userStatusBubble());

  function userStatusBubble() {
    return {
      template: require('./user-status-bubble.pug'),
      controller: 'userStatusBubbleController',
      controllerAs: 'ctrl',
      bindings: {
        userId: '<'
      }
    };
  }

})(angular);
