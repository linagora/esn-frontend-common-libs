'use strict';

/* global chai, sinon: false */

var { expect } = chai;

describe('The esnLoginSuccessService factory', function() {
  var esnLoginSuccessService, $window;

  beforeEach(function() {
    angular.mock.module('esn.login');
  });

  beforeEach(function() {
    angular.mock.module('esn.login', function($provide) {
      const $window = { location: { reload: sinon.spy() } };

      $provide.value('$window', $window);
      $window.onbeforeunload = sinon.spy();
    });
  });

  beforeEach(angular.mock.inject(function(_$window_, _esnLoginSuccessService_) {
    $window = _$window_;
    esnLoginSuccessService = _esnLoginSuccessService_;
  }));

  it('should return a  function', function() {
    expect(esnLoginSuccessService).to.be.a('function');
  });

  it('should reload the page when fired', function() {
    $window.location.reload = sinon.spy();
    esnLoginSuccessService();

    expect($window.location.reload).to.have.been.calledOnce;
  });

  it('should return a promise', function() {
    $window.location.reload = sinon.spy();
    var loginResponse = esnLoginSuccessService();

    expect(loginResponse).to.respondTo('then');
  });
});
