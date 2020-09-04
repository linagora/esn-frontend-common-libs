(function(angular) {
  'use strict';

  angular.module('esn.settings-overlay', [])
    .component('settingsOverlay', {
      template: require('../../views/modules/settings-overlay/template.pug'),
      transclude: true,
      controller: function() {
        var self = this;

        self.openMenu = function($mdMenu, event) {
          $mdMenu.open(event);
        };
      },
      controllerAs: 'ctrl'
    });
})(angular);
