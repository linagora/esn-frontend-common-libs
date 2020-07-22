'use strict';

const Autolinker = require('../../components/Autolinker.js/dist/Autolinker');

angular.module('esn.autolinker-wrapper', [])

.factory('autolinker', function($window) {
  return Autolinker;
});

