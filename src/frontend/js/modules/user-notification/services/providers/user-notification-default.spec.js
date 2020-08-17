'use strict';

describe('The EsnUserNotificationDefault factory', function() {
  var $httpBackend, EsnUserNotificationDefault;

  beforeEach(function() {
    angular.mock.module('esn.user-notification');
  });

  beforeEach(angular.mock.inject(function(
    _EsnUserNotificationDefault_,
    _$httpBackend_
  ) {
    EsnUserNotificationDefault = _EsnUserNotificationDefault_;
    $httpBackend = _$httpBackend_;
  }));

  describe('the setAcknowledged function', function() {
    it('should send a request PUT /api/user/notifications/123456789/acknowledged', function() {
      var notification = new EsnUserNotificationDefault({
        _id: '123456789'
      });

      $httpBackend.expectPUT('/api/user/notifications/123456789/acknowledged').respond([]);
      notification.setAcknowledged(true);
      $httpBackend.flush();
    });
  });
});
