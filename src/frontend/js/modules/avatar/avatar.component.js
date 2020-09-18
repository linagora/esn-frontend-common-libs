angular.module('esn.avatar')
  .component('esnAvatar', {
    template: require('./avatar.pug'),
    controller: 'EsnAvatarController',
    bindings: {
      userId: '<',
      userEmail: '<',
      avatarUrl: '<',
      hideUserStatus: '<',
      noCache: '<',
      resolveAvatar: '&',
      objectType: '<'
    }
  });
