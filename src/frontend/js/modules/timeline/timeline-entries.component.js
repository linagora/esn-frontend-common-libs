(function(angular) {
  'use strict';

  angular.module('esn.timeline').component('esnTimelineEntries', {
    controller: 'esnTimelineEntriesController',
    template: require('./timeline-entries.pug')
  });
})(angular);
