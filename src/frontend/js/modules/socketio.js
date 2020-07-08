/* global io */
(function(angular) {
  'use strict';

  angular.module('esn.socketio', []).factory('io', function() {
    return function() {
      return io;
    };
  });

})(angular);
