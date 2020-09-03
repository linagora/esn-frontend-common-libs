const Waves = require('../../components/waves/dist/waves');

(function(angular) {
  'use strict';

  angular.module('esn.waves', [])

    .run(function() {
      Waves.init();
    })

    .directive('btn', function() {
      return {
        restrict: 'C',
        link: function(scope, element) {
          if (element.hasClass('btn-icon') || element.hasClass('btn-float')) {
            Waves.attach(element, ['waves-light', 'waves-circle']);
          } else if (element.hasClass('btn-link')) {
            Waves.attach(element, ['waves-light']);
          } else {
            Waves.attach(element);
          }
        }
      };
    });

})(angular);
