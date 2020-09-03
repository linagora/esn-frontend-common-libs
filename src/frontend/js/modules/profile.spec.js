'use strict';

/* global chai: false */

var { expect } = chai;

describe('The esn.profile Angular module', function() {

  beforeEach(function() {
    angular.mock.module('esn.profile');
    angular.mock.module(function($provide) {
      $provide.value('translateFilter', text => text);
    });
  });

  describe('avatarController', function() {
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
      this.$scope = $rootScope.$new();
      this.$rootScope = $rootScope;
      this.$timeout = function(cb) { return cb(); };

      $controller('avatarController', {
        $rootScope: this.$rootScope,
        $scope: this.$scope,
        $timeout: this.$timeout
      });
    }));

    it('should update the avatarURL on avatar:updated event', function(done) {
      this.$scope.getURL = function() {
        return done();
      };
      this.$rootScope.$broadcast('avatar:updated');
    });
  });

  describe('The profileMinicard directive', function() {

    beforeEach(angular.mock.inject(function($compile, $rootScope) {
      this.$compile = $compile;
      this.$rootScope = $rootScope;
    }));

    it('should display the user information', function() {

      var html = '<profile-minicard user="user"></profile-minicard>';
      var element = this.$compile(html)(this.$rootScope);

      this.$rootScope.user = {
        name: 'Me',
        address: 'foo@bar.com'
      };

      this.$rootScope.$digest();
      expect(element.html()).to.have.string(this.$rootScope.user.name);
      expect(element.html()).to.have.string(this.$rootScope.user.address);
    });
  });

});
