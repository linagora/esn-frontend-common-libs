(function(angular) {
  'use strict';

  angular.module('esn.follow').run(runBlock);

  function runBlock(esnTimelineEntryProviders, FOLLOW_LINK_TYPE, UNFOLLOW_LINK_TYPE) {
    esnTimelineEntryProviders.register({
      verb: FOLLOW_LINK_TYPE,
      template: require("./timeline/follow.pug"),
      canHandle: function() {
        return true;
      }
    });

    esnTimelineEntryProviders.register({
      verb: UNFOLLOW_LINK_TYPE,
      template: require("./timeline/unfollow.pug"),
      canHandle: function() {
        return true;
      }
    });
  }

})(angular);
