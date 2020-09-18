angular.module('esn.avatar')
  .controller('EsnAvatarController', EsnAvatarController);

function EsnAvatarController($attrs, $q, $log, userAPI, esnAvatarUrlService) {
  var self = this;

  self.$onInit = setProperties;
  self.$onChanges = setProperties;
  self.displayUserStatus = displayUserStatus;
  self.avatar = {};

  function setProperties() {
    if ($attrs.resolveAvatar) {
      return self.resolveAvatar().then(function(avatar) {
        self.avatar = avatar;
      });
    }

    self.avatar = {};

    if (self.userId) {
      self.avatar.id = self.userId;
    }

    if (self.userEmail) {
      self.avatar.email = self.userEmail;
    }

    self.avatar.url = self.avatarUrl || generateAvatarUrl(self.avatar.id, self.avatar.email);

    if (self.userEmail && !self.avatar.id) {
      getUserIdByEmail(self.userEmail).then(function(userId) {
        self.avatar.id = userId;
      });
    }
  }

  function generateAvatarUrl(id, email) {
    if (id) {
      return esnAvatarUrlService.generateUrlByUserId(id, self.noCache);
    }

    if (email) {
      return esnAvatarUrlService.generateUrl(email, self.noCache);
    }
  }

  function getUserIdByEmail(userEmail) {
    return userAPI.getUsersByEmail(userEmail)
      .then(function(response) {
        if (response.data && response.data[0]) {
          return response.data[0]._id;
        }
      });
  }

  function displayUserStatus() {
    return self.objectType === 'user' ? !!self.avatar.id && !self.hideUserStatus : false;
  }
}
