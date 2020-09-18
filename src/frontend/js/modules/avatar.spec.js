'use strict';

/* global chai, sinon: false */

var { expect } = chai;

describe('The Avatar Angular module', function() {
  beforeEach(angular.mock.module('esn.avatar'));

  describe('the EsnAvatarController', function() {
    var $q, $compile, $rootScope, $logMock, element, controller, esnAvatarUrlServiceMock, userAPIMock, user, result;

    function compileEsnAvatar(html) {
      element = $compile(html)($rootScope.$new());
      $rootScope.$digest();

      $('body').append(element);
      controller = element.controller('esnAvatar');

      return element;
    }

    afterEach(function() {
      if (element) {
        element.remove();
      }
    });

    beforeEach(function() {
      $logMock = {
        error: sinon.spy(),
        info: sinon.spy(),
        debug: sinon.spy()
      };

      user = {
        _id: '123',
        firstname: 'Dali',
        lastname: 'Dali'
      };

      result = {
        data: [user]
      };

      userAPIMock = {
        user: angular.noop,
        getUsersByEmail: sinon.spy(function() {
          return $q.when(result);
        })
      };

      esnAvatarUrlServiceMock = {
        generateUrl: sinon.spy(),
        generateUrlByUserId: sinon.spy()
      };

      angular.mock.module(function($provide) {
        $provide.value('userAPI', userAPIMock);
        $provide.value('$log', $logMock);
        $provide.value('esnAvatarUrlService', esnAvatarUrlServiceMock);
      });

      angular.mock.inject(function(_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });

      $rootScope.userId = '58be757006a35238647028d8';
      $rootScope.userEmail = 'dali@open-paas.org';
      $rootScope.avatarURL = '/api/user/profile/avatar?cb=1490951414696';
      $rootScope.objectType = 'user';
      $rootScope.objectTypeNotUser = 'contact';
      $rootScope.resolveAvatar = function() {
        return $q.when({
          id: 'myId',
          url: 'myUrl',
          email: 'myEmail'
        });
      };
    });

    describe('$onInit function', function() {

      it('should initialize the avatar object from the resolveAvatar function when provided', function() {
        compileEsnAvatar('<esn-avatar resolve-avatar="resolveAvatar()" />');

        expect(controller.avatar).to.deep.equal({
          id: 'myId',
          url: 'myUrl',
          email: 'myEmail'
        });
      });

      it('should initialize the avatar.url with the same URL in avatarUrl if it is defined', function() {
        compileEsnAvatar('<esn-avatar avatar-url="avatarURL" user-id="userId" user-email="userEmail" />');

        expect(controller.avatar.url).to.be.equal($rootScope.avatarURL);
      });

      it('should initialize the avatarURL with the URL generate from the userId if userId defined and avatarUrl is undefined', function() {
        compileEsnAvatar('<esn-avatar user-id="userId" user-email="userEmail" />');

        expect(esnAvatarUrlServiceMock.generateUrlByUserId).to.be.calledWith($rootScope.userId);
      });

      it('should initialize the avatarURL with the URL generate from the userEmail if userEmail defined and the avatarUrl and userId are undefined', function() {
        compileEsnAvatar('<esn-avatar user-email="userEmail" />');

        expect(esnAvatarUrlServiceMock.generateUrl).to.be.calledWith(controller.userEmail);
      });

      it('should call userAPI.getUserByEmail and initialize avatar.id if the userEmail is defined and userId is undefined', function() {
        compileEsnAvatar('<esn-avatar user-email="userEmail" />');

        expect(controller.avatar.id).to.be.equal(user._id);
      });

      it('should not update userId if the userId is defined', function() {
        compileEsnAvatar('<esn-avatar user-id="userId" user-email="userEmail" />');

        expect(controller.userId).to.be.equal($rootScope.userId);
      });

      it('should not initialize userId if the userAPI.getUsersByEmail returned an empty array', function() {
        userAPIMock.getUsersByEmail = function() {
          return $q.when({ data: [] });
        };

        compileEsnAvatar('<esn-avatar user-email="userEmail" />');

        expect(controller.userId).to.equal(undefined);
      });
    });

    describe('displayUserStatus function', function() {

      it('should return true if avatar.id is defined and hideUserStatus = false', function() {
        compileEsnAvatar('<esn-avatar resolve-avatar="resolveAvatar()" object-type="objectType" />');

        expect(controller.displayUserStatus()).to.equal(true);
      });

      it('should return false if avatar.id is defined and hideUserStatus = true', function() {
        compileEsnAvatar('<esn-avatar resolve-avatar="resolveAvatar()" hide-user-status="true" object-type="objectType" />');

        expect(controller.displayUserStatus()).to.equal(false);
      });

      it('should return false if avatar.id is undefined and hideUserStatus = true', function() {
        compileEsnAvatar('<esn-avatar hide-user-status="true" object-type="objectType" />');

        expect(controller.displayUserStatus()).to.equal(false);
      });

      it('should return false if avatar.id is undefined and hideUserStatus = false', function() {
        compileEsnAvatar('<esn-avatar object-type="objectType"/>');

        expect(controller.displayUserStatus()).to.equal(false);
      });

      it('should return false if the objectType is not an user', function() {
        compileEsnAvatar('<esn-avatar object-type="objectTypeNotUser"/>');

        expect(controller.displayUserStatus()).to.equal(false);
      });

    });
  });

  describe('esnAvatar component', function() {
    var $rootScope, $compile, $scope, $httpBackend, element;

    beforeEach(angular.mock.module('esn.user'));
    beforeEach(angular.mock.inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
    }));

    afterEach(function() {
      if (element) {
        element.remove();
      }
    });

    function buildElement() {
      var html = '<esn-avatar user-id="user.id" user-email="user.email"></esn-avatar>';

      element = $compile(html)($scope);
      $('body').append(element);

      return element;
    }

    it('should update avatar url when switching from a user id to a user email', function() {
      $httpBackend.expectGET('/api/users?email=k2r@linagora.com').respond(200);

      $scope.user = {
        id: 'user1'
      };

      buildElement();

      $rootScope.$digest();
      expect(element.find('img').attr('src')).to.equal('/api/users/user1/profile/avatar');

      $scope.user = {
        email: 'k2r@linagora.com'
      };
      $rootScope.$digest();
      expect(element.find('img').attr('src')).to.equal('/api/avatars?email=k2r@linagora.com&objectType=email');
    });

    it('should update avatar url when switching from a user id to another user id', function() {
      $scope.user = {
        id: 'user1'
      };

      buildElement();

      $rootScope.$digest();
      expect(element.find('img').attr('src')).to.equal('/api/users/user1/profile/avatar');

      $scope.user = {
        id: 'user2'
      };
      $rootScope.$digest();
      expect(element.find('img').attr('src')).to.equal('/api/users/user2/profile/avatar');
    });
  });
});
