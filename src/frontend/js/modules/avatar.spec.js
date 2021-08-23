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

  describe('EsnInitialsAvatarGenerator service', function() {
    let EsnInitialsAvatarGeneratorService;

    beforeEach(angular.mock.inject(function(_EsnInitialsAvatarGeneratorService_) {
      EsnInitialsAvatarGeneratorService = _EsnInitialsAvatarGeneratorService_;
    }));

    it('should generate a base64 image using the provided username/email', () => {
      const expectedAvatar = 'data:image/png;base64,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';
      const username = 'John';

      const generatedAvatar = EsnInitialsAvatarGeneratorService.generate(username);

      expect(generatedAvatar).to.equal(expectedAvatar);
    });
  });
});
