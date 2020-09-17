'use strict';

/* global sinon, chai: false */

const Client = require('esn-api-client/src/Client');
const { expect } = chai;

describe('The ESN API Client module', function() {
  let ClientMock;
  let $window;
  let esnApiClient;

  beforeEach(function() {
    ClientMock = sinon.spy(class Client {});

    sinon.stub(Client, 'default').value(ClientMock);

    angular.mock.module('esn.api-client');
    angular.mock.inject(function(_$window_, _esnApiClient_) {
      $window = _$window_;
      esnApiClient = _esnApiClient_;
    });
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('The esnApiClient factory', function() {
    it('should create a new instance of Client with correct options', function() {
      expect(ClientMock).to.have.been.calledWith(sinon.match({
        baseURL: $window.location.origin,
        customPromise: $q
      }));
      expect(esnApiClient instanceof ClientMock).to.be.true;
    });
  });
});
