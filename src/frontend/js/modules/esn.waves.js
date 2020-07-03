'use strict';
const Waves = require('../../components/waves/dist/waves');

angular.module('esn.waves', [])

  .run(function($window) {
    Waves.init();
  })

  .directive('btn', function($window) {
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
