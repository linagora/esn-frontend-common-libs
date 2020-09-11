'use strict';

/* global sinon, chai: false */

// We're mocking this inside test/config/mocks/esn-api-client.js
const Client = require('esn-api-client/src/Client').default;
const { expect } = chai;

describe('The ESN API Client module', function() {
  let $window;
  let esnApiClient;

  beforeEach(function() {
    angular.mock.module('esn.api-client');
    angular.mock.inject(function(_$window_, _esnApiClient_) {
      $window = _$window_;
      esnApiClient = _esnApiClient_;
    });
  });

  describe('The esnApiClient factory', function() {
    it('should create a new instance of Client with correct options', function() {
      expect(Client).to.have.been.calledWith(sinon.match({
        baseURL: $window.location.origin,
        customPromise: $q
      }));
      expect(esnApiClient instanceof Client).to.be.true;
    });
  });
});
