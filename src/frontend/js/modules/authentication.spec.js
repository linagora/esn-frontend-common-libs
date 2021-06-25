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
    $provide.value('esnAuth', {});
  }));

  beforeEach(inject(function(_tokenAPI_) {
    tokenAPI = _tokenAPI_;
  }));

  describe('the getNewToken method', function() {
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

  describe('the getWebToken method', () => {
    it('should call POST /api/jwt/generate', () => {
      const promiseSpy = sinon.fake.resolves('jwt');

      esnRestangular.one = sinon.fake.returns({ post: promiseSpy });

      tokenAPI.getWebToken();
      expect(esnRestangular.one).to.have.been.calledWith('jwt/generate');
      expect(promiseSpy).to.have.been.called;
    });

    it('should call POST /api/jwt/generate', () => {
      const promiseSpy = sinon.fake.resolves('jwt');

      esnRestangular.one = sinon.fake.returns({ post: promiseSpy });

      tokenAPI.getWebToken();
      expect(esnRestangular.one).to.have.been.calledWith('jwt/generate');
      expect(promiseSpy).to.have.been.called;
    });

    it('should call the cached token promise ( that doesn\'t expire ) to POST /api/jwt/generate', () => {
      const promiseSpy = sinon.stub();

      promiseSpy.resolves('jwt');

      esnRestangular.one = sinon.fake.returns({ post: promiseSpy });

      return tokenAPI.getWebToken().then(() => {
        tokenAPI.getWebToken();
        expect(esnRestangular.one).to.have.been.calledWith('jwt/generate');
        expect(promiseSpy).to.have.been.calledTwice; // twice, cause it tries to decode the token first
      });
    });

    it('should ignore the cached promise when specified in the arguments', () => {
      const promiseSpy = sinon.stub();

      promiseSpy.resolves('jwt');
      esnRestangular.one = sinon.fake.returns({ post: promiseSpy });

      return tokenAPI.getWebToken().then(() => {
        tokenAPI.getWebToken(true);
        expect(promiseSpy).to.have.been.calledTwice;
        expect(esnRestangular.one).to.have.been.calledWithExactly('jwt/generate');
      });
    });

    it('should try to fetch another token if the cached token is expired', () => {
      const promiseSpy = sinon.stub();

      // resolve to an expired token, this token expired on Thursday, January 18, 2018 1:32:03 AM
      // decoded token:
      // {
      //   "sub": "1234567890",
      //   "name": "John Doe",
      //   "iat": 1516239022,
      //   "exp": 1516239123 // Thursday, January 18, 2018 1:32:03 AM
      // }
      promiseSpy.resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkxMjN9.MJuIweGw2pVzGh_lNFfsbAH1-Lrr5JVRZptQqgBMDVg');

      return tokenAPI.getWebToken() // fetch the token initially
        .then(() => {
          tokenAPI.getWebToken(); // try to use the cached token

          expect(esnRestangular.one).to.have.been.calledWithExactly('jwt/generate');
          expect(esnRestangular.one).to.have.callCount(4);
          // why 4 you ask?
          // - inital call ( nothing caled) we make 2 calls:
          //  1 - resolve the promise and decode the token, then cache it and return the initial promise
          //  2 - call the promise ( when calling getWebToken )
          // - second call ( a token is cached, but is expired) we make 2 calls:
          //  1 - fetch the cached token, check the expiration time, ah it's expired! request a new token.
          //  2 - resolve the promise and decode the token, then cache it and return the initial promise ( 1 call )
          //  3 - call the promise ( when calling getWebToken ) ( 1 call )
        });
    });
  });
});
