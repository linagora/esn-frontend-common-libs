(function() {
  'use strict';

  angular.module('esn.collaboration')
    .component('esnCollaborationMembershipRequestsWidget', esnCollaborationMembershipRequestsWidget());

  function esnCollaborationMembershipRequestsWidget() {
    return {
      bindings: {
        objectType: '@',
        collaboration: '=',
        elementsPerPage: '=?',
        objectTypeFilter: '@?',
        scrollInsideContainer: '@?'
      },
      controller: 'ESNCollaborationMembershipRequestsWidgetController',
      controllerAs: 'ctrl',
      template: require('./collaboration-membership-requests-widget.pug')
    };
  }
})();
