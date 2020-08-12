// TODO: Write tests for this (https://github.com/OpenPaaS-Suite/esn-frontend-common-libs/issues/78)
angular.module('esn.default-ui-state')
  .directive('esnDefaultUiSref', function($state, $log) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        const availableStates = $state.get();
        const defaultState = availableStates.find(state => state.name === attrs.esnDefaultUiSref) || availableStates.find(state => state.default);

        if (!defaultState) {
          return $log.error(`There is no ${attrs.esnDefaultUiSref} state or a default state to navigate to.`)
        }

        element.click(() => $state.go(defaultState, {}, { inherit: false }));
      }
    };
  })
