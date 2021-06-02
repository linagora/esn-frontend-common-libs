(function() {
  'use strict';

  angular.module('esn.profile-menu')
    .controller('ESNProfileMenuController', ESNProfileMenuController);

  function ESNProfileMenuController($scope, session, esnAvatarUrlService, APPLICATION_GRID_ACCOUNT_SPA_NAME) {
    var self = this;

    self.$onInit = $onInit;
    self.openMenu = openMenu;

    function $onInit() {
      self.avatarURL = esnAvatarUrlService.generateUrlByUserId(session.user._id, true);
      self.accountUrl = _accountUrl();

      $scope.$on('avatar:updated', onAvatarUpdated);
    }

    function openMenu($mdMenu, event) {
      $mdMenu.open(event);
    }

    function onAvatarUpdated(event, user) {
      if (user && user._id === session.user._id) {
        self.avatarURL = esnAvatarUrlService.generateUrlByUserId(user._id, true);
      }
    }

    function _accountUrl() {

      if (window.openpaas && window.openpaas.ACCOUNT_SPA_URL) {
        return window.openpaas.ACCOUNT_SPA_URL;
      }

      const appGridItems = window.openpaas && window.openpaas.APP_GRID_ITEMS || process.env.APP_GRID_ITEMS;

      if (appGridItems) {
        const applications = JSON.parse(appGridItems);
        const accountApp = applications.find(({ name }) => name === APPLICATION_GRID_ACCOUNT_SPA_NAME);

        if (accountApp) return accountApp.url;
      }

      return '/account/';
    }
  }
})();
