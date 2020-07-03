(function() {
  'use strict';

  angular.module('esn.message').component('messageActionsDropdown', {
    bindings: {
      message: '=',
      activitystream: '=',
      parent: '=?'
    },
    controller: 'messageActionsController',
    controllerAs: 'ctrl',
    template: require("./message-actions-dropdown.pug")
  });

})(angular);
