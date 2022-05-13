'use strict';

/* global chai, sinon: false */

var { expect } = chai;

describe('The esn.session Angular module', function() {
  beforeEach(angular.mock.module('esn.session'));

  describe('session service', function() {
    beforeEach(function() {
      var self = this;

      angular.mock.inject(function(session) {
        self.session = session;
      });
    });

    it('should return an object with 2 properties: user, domain', function() {
      expect(this.session.user).to.be.an.object;
      expect(this.session.domain).to.be.an.object;
    });

    it('should return an object with 5 methods: setUser, setDomain, setLogout, setLogin, isLoggedIn', function() {
      expect(this.session).to.respondTo('setUser');
      expect(this.session).to.respondTo('setDomain');
      expect(this.session).to.respondTo('setLogout');
      expect(this.session).to.respondTo('setLogin');
      expect(this.session).to.respondTo('isLoggedIn');
    });

    describe('setUser method', function() {
      it('should set the session.user object', function() {
        var { user } = this.session;
        var user1 = {
          _id: '1',
          name: 'hello',
          emails: ['someone@example.com'],
          emailMap: { 'someone@example.com': true }
        };
        var user2 = {
          _id: '2',
          name: 'yolo',
          emails: ['yolo@example.com'],
          emailMap: { 'yolo@example.com': true }
        };

        this.session.setUser(user1);
        expect(user).to.deep.equal(user1);
        this.session.setUser(user2);
        expect(user).to.deep.equal(user2);
      });
    });

    describe('setDomain method', function() {
      it('should set the session.domain object', function() {
        var { domain } = this.session;
        var domain1 = {
          _id: '1',
          name: 'hello'
        };
        var domain2 = {
          _id: '2',
          name2: 'yolo'
        };

        this.session.setDomain(domain1);
        expect(domain).to.deep.equal(domain1);
        this.session.setDomain(domain2);
        expect(domain).to.deep.equal(domain2);
      });
    });

    describe('setLogin method', function() {
      it('should set session private field loggedIn to true', function() {
        this.session.setLogin();
        expect(this.session.isLoggedIn()).to.be.true;
      });
    });

    describe('setLogout method', function() {
      it('should set session private field loggedIn to false', function() {
        this.session.setLogout();
        expect(this.session.isLoggedIn()).to.be.false;
      });
    });

    describe('isLoggedIn method', function() {
      it('should retrieve private field loggedIn', function() {
        this.session.setLogin();
        expect(this.session.isLoggedIn()).to.be.true;

        this.session.setLogout();
        expect(this.session.isLoggedIn()).to.be.false;
      });
    });

    describe('The getProviderAccounts function', function() {
      it('should return empty array when no input provider', function() {
        this.session.setUser({
          _id: '1',
          name: 'yolo',
          emails: ['yolo@example.com']
        });

        expect(this.session.getProviderAccounts()).to.deep.equal([]);
      });

      it('should return empty array when no account', function() {
        this.session.setUser({
          _id: '1',
          name: 'yolo',
          emails: ['yolo@example.com']
        });

        expect(this.session.getProviderAccounts('twitter')).to.deep.equal([]);
      });

      it('should return empty array when only other accounts', function() {
        this.session.setUser({
          _id: '1',
          name: 'yolo',
          emails: ['yolo@example.com'],
          accounts: [{
            data: {
              provider: 'other',
              field: 'value'
            }
          }]
        });

        expect(this.session.getProviderAccounts('twitter')).to.deep.equal([]);
      });

      it('should return all requested accounts', function() {
        this.session.setUser({
          _id: '1',
          name: 'yolo',
          emails: ['yolo@example.com'],
          accounts: [{
            data: {
              provider: 'other',
              field: 'value'
            }
          }, {
            data: {
              provider: 'twitter',
              field1: 'value1'
            }
          }, {
            data: {
              provider: 'twitter',
              field2: 'value2'
            }
          }]
        });

        expect(this.session.getProviderAccounts('twitter')).to.deep.equal([{
          provider: 'twitter',
          field1: 'value1'
        }, {
          provider: 'twitter',
          field2: 'value2'
        }]);
      });

    });

    describe('userIsDomainAdministrator function', function() {

      beforeEach(function() {
        this.session.setDomain({
          _id: '1',
          name: 'hello',
          administrators: []
        });
        this.session.setUser({
          _id: 'admin',
          name: 'admin',
          emails: ['admin@example.com']
        });
      });

      it('should return false if user is not domain administrator', function() {
        expect(this.session.userIsDomainAdministrator()).to.be.false;
      });

      it('should return true if user is domain administrator', function() {
        this.session.domain.administrators.push({ user_id: this.session.user._id });

        expect(this.session.userIsDomainAdministrator()).to.be.true;
      });

      it('should return true if user is domain administrator (deprecated)', function() {
        this.session.domain.administrator = this.session.user._id;

        expect(this.session.userIsDomainAdministrator()).to.be.true;
      });

    });
  });

  describe('sessionFactory service', function() {
    var service, $rootScope, userdefer, domaindefer, userAPI, domainAPI, session, esnAuth;

    beforeEach(function() {

      userAPI = {
        currentUser: function() {
          userdefer = $q.defer();

          return userdefer.promise;
        },
        user: function() {
          userdefer = $q.defer();

          return userdefer.promise;
        }
      };

      domainAPI = {
        get: function() {
          domaindefer = $q.defer();

          return domaindefer.promise;
        }
      };

      session = {
        setUser: function() {},
        setDomain: function() {},
        setLogin: function() {},
        setLogout: function() {},
        isLoggedIn: function() {},
        domain: {},
        ready: $q.when()
      };

      esnAuth = {
        signInCompletePromise: {
          then: callback => callback()
        }
      };

      angular.mock.module(function($provide) {
        $provide.value('userAPI', userAPI);
        $provide.value('domainAPI', domainAPI);
        $provide.value('session', session);
        $provide.value('esnAuth', esnAuth);
      });

      angular.mock.inject(function($injector, _$rootScope_) {
        service = $injector.get('sessionFactory');
        $rootScope = _$rootScope_;
      });
    });

    it('should callback(error.data) if there is an error with error.data in the user request', function(done) {
      service.fetchUser(function(error) {
        if (error) {
          expect(error).to.deep.equal({ error: 'error', message: 'message' });
          done();
        } else {
          done(new Error());
        }
      });
      userdefer.reject({ data: { error: 'error', message: 'message' } });
      $rootScope.$digest();
    });

    it('should render the error template if the user does not belong to a domain', function(done) {
      service.fetchUser(function(error) {
        if (error) {
          expect(error).to.deep.equal({
            error: 400, message: 'Invalid user', details: 'User does not belong to a domain', displayLogout: true
          });
          done();
        } else {
          done(new Error());
        }
      });
      userdefer.resolve({ data: { _id: 'user1', name: 'foo' } });
      $rootScope.$digest();
    });

    it('should call domainAPI.get() with the first domain id in user.domains', function(done) {
      domainAPI.get = function(id) {
        expect(id).to.equal('I1');
        done();
      };
      service.fetchUser(function() {});
      userdefer.resolve({ data: { _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] } });
      $rootScope.$digest();
    });

    it('should render the error template if there is an error in the domain request', function(done) {
      service.fetchUser(function(error) {
        if (error) {
          expect(error).to.deep.equal({ error: 'error', message: 'message' });
          done();
        } else {
          done(new Error());
        }
      });

      userdefer.resolve({ data: { _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] } });
      $rootScope.$digest();
      domaindefer.reject({ data: { error: 'error', message: 'message' } });
      $rootScope.$digest();
    });

    it('should render the application template if domain & user request succeded', function(done) {
      service.fetchUser(function(error) {
        if (error) {
          done(new Error());
        } else {
          done();
        }
      });

      userdefer.resolve({ data: { _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] } });
      $rootScope.$digest();
      domaindefer.resolve({ data: { _id: 'D1', name: 'domain1' } });
      $rootScope.$digest();
    });

    it('should call session.setUser when user is retrieved', function(done) {
      session.setUser = function(user) {
        expect(user).to.deep.equal({ _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] });
        done();
      };
      service.fetchUser(function(error) {
        if (error) {
          done(new Error());
        } else {
          done();
        }
      });
      service.fetchUser(function() {});

      userdefer.resolve({ data: { _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] } });
      $rootScope.$digest();
    });

    it('should call session.setDomain when domain is retrieved', function(done) {
      session.setDomain = function(domain) {
        expect(domain).to.deep.equal({ _id: 'D1', name: 'domain1' });
        done();
      };
      service.fetchUser(function() {});

      userdefer.resolve({ data: { _id: 'user1', name: 'foo', domains: [{ domain_id: 'I1' }, { domain_id: 'I2' }] } });
      $rootScope.$digest();
      domaindefer.resolve({ data: { _id: 'D1', name: 'domain1' } });
      $rootScope.$digest();
    });

  });

  describe('the sessionInitESNController', () => {
    let userAPI, esnAuth, self;

    beforeEach(function() {
      self = this;

      userAPI = {
        currentUser: sinon.stub().returns($q.when({})),
        user: sinon.stub().returns($q.when({}))
      };

      esnAuth = {
        signin: sinon.spy(),
        init: sinon.stub().returns($q.when({}))
      };

      angular.mock.module(function($provide) {
        $provide.value('userAPI', userAPI);
        $provide.value('esnAuth', esnAuth);
      });

      angular.mock.inject(function($rootScope, $controller, session, $timeout) {
        this.$scope = $rootScope.$new();
        this.$rootScope = $rootScope;
        this.$controller = $controller;
        this.session = session;
        this.$timeout = $timeout;
      });
    });

    function initController() {
      const controller = self.$controller('sessionInitESNController', {
        $rootScope: self.$rootScope,
        $scope: self.$scope
      });

      return controller;
    }

    it('should redirect to the signin url if the user is unauthorized ( broken session )', function() {
      esnAuth.init = sinon.stub().returns($q.reject({
        code: 401
      }));

      initController();
      this.$scope.$digest();

      expect(esnAuth.signin).to.have.been.called;
    });

    it('shouldn\'t redirect to the signin url when a non 401 error was received', function() {
      esnAuth.init = sinon.stub().returns($q.reject({
        code: 500
      }));

      initController();

      expect(esnAuth.signin).to.not.have.been.called;
    });
  });
});
