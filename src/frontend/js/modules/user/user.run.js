require('./user-utils.service.js');
require('./user-api.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.user')
    .run(runBlock);

  function runBlock($templateCache, objectTypeResolver, userAPI, userUtils, esnRestangular) {
    objectTypeResolver.register('user', userAPI.user);
    esnRestangular.extendModel('users', function(model) {
      model.url = function(user) {
        return '/#/profile/' + user._id || user;
      };
      model.avatarUrl = function(user) {
        return '/api/avatars?objectType=user&email=' + user.emails[0] || user;
      };
      model.displayName = function(user) {
        return userUtils.displayNameOf(user);
      };
      model.__id = function(user) {
        return user._id || user;
      };

      return model;
    });

    $templateCache.put('/views/modules/auto-complete/users.html', require('../../../views/modules/auto-complete/users.pug'));
    $templateCache.put('/views/modules/auto-complete/user-auto-complete.html', require('../../../views/modules/auto-complete/user-auto-complete.pug'));
  }
})(angular);
