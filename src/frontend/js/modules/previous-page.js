angular.module('esn.previous-page', [])

  .run(function(esnPreviousPage) {
    esnPreviousPage.init();
  })

  .directive('esnBackButton', function($state, $log, esnPreviousPage) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        // TODO: Write tests for the newly changed logic: https://github.com/OpenPaaS-Suite/esn-frontend-calendar/issues/12, https://github.com/OpenPaaS-Suite/esn-frontend-inbox/issues/74
        const availableStates = $state.get();
        const backState = availableStates.find(state => state.name === attrs.esnBackButton) || availableStates.find(state => state.default);

        if (!backState) {
          $log.warn(`There is no ${attrs.esnBackButton} state or a default state to come back to.`)
        }

        element.click(() => esnPreviousPage.back(backState ? backState.name : attrs.esnBackButton));
      }
    };
  })

  .factory('esnPreviousPage', function($rootScope, $state, $window) {
    let hasPreviousPage = false;

    return {
      back: back,
      init: init
    };

    function back(defaultState) {
      if (hasPreviousPage && $window.history && $window.history.length > 0) {
        return $window.history.back();
      }

      $state.go(defaultState);
    }

    function init() {
      const unregister = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        // if url updated and new history record added
        // see more at https://github.com/angular-ui/ui-router/wiki/quick-reference#stategoto--toparams--options
        if (options && options.location === true) {
          hasPreviousPage = true;
          unregister();
        }
      });
    }
  });
