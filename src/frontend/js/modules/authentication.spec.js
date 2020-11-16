/* global chai, sinon: false */

const { expect } = chai;
const { module, inject } = angular.mock;

describe('The esn.authentication tokenAPI service', function() {
  const esnRestangular = {};
  let tokenAPI;

  beforeEach(function() {
    module('esn.authentication');
  });

  beforeEach(module(function($provide) {
    $provide.value('esnRestangular', esnRestangular);
  }));

  beforeEach(inject(function(_tokenAPI_) {
    tokenAPI = _tokenAPI_;
  }));

  it('should call GET /api/authenticationtoken', function() {
    const getSpy = sinon.fake.resolves('token1');

    esnRestangular.one = sinon.fake.returns({ get: getSpy });

    tokenAPI.getNewToken();
    expect(esnRestangular.one).to.have.been.calledWith('authenticationtoken');
    expect(getSpy).to.have.been.called;
  });

  it('should cache calls to GET /api/authenticationtoken', function() {
    const getSpy = sinon.stub();

    getSpy.resolves('token1');

    esnRestangular.one = sinon.fake.returns({ get: getSpy });

    return tokenAPI.getNewToken().then(() => {
      tokenAPI.getNewToken();
      expect(esnRestangular.one).to.have.been.calledOnceWithExactly('authenticationtoken');
      expect(getSpy).to.have.been.calledOnce;
    });
  });

  it('should not use cache when first argument is true', function() {
    const getSpy = sinon.stub();

    getSpy.resolves('token1');

    esnRestangular.one = sinon.fake.returns({ get: getSpy });

    return tokenAPI.getNewToken().then(() => {
      tokenAPI.getNewToken(true);
      expect(esnRestangular.one).to.have.been.calledTwice;
      expect(esnRestangular.one).to.have.been.calledWithExactly('authenticationtoken');
      expect(getSpy).to.have.been.calledTwice;
    });
  });
});
