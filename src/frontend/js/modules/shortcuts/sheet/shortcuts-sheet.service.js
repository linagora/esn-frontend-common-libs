(function(angular) {
  'use strict';

  angular.module('esn.shortcuts')
    .service('esnShortcutsSheet', esnShortcutsSheet);

  function esnShortcutsSheet($modal) {
    var modal;

    return {
      toggle: toggle
    };

    function toggle() {
      if (!modal) {
        modal = $modal({
          template: require('./shortcuts-sheet.pug'),
          controller: 'EsnShortcutsSheetController',
          controllerAs: '$ctrl',
          placement: 'center'
        });
      } else {
        modal.toggle();
      }
    }
  }
})(angular);
