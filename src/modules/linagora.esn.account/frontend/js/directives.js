(function(angular){
  'use strict';

  angular.module('linagora.esn.account')
    .directive('fabAccountDropup', function() {
      return {
        restrict: 'E',
        template: require('../../../../frontend/views/modules/ui/fab.pug'),
        link: function($scope, $element) {

          function getModal() {
            return angular.element($element[0].querySelector('.modal-accounts-list'));
          }

          $scope.hide = function() {
            var e = getModal();
            if (!e) {
              return;
            }

            if (e.hasClass('active')) {
              e.removeClass('active');
            }
          };

          $scope.onClick = function() {
            var e = getModal();
            if (!e) {
              return;
            }

            if (e.hasClass('active')) {
              e.removeClass('active');
            } else {
              e.addClass('active');
            }
          };
        }
      };
    })
    .directive('accountDisplayer', function() {
      return {
        restrict: 'E',
        template: require('../views/partials/account-displayer.pug'),
        scope: {
          account: '='
        }
      };
    })

    .directive('accountMenuItem', function(oauthStrategyRegistry) {
      function link(scope, elem, attr) {
        scope.openAccount = oauthStrategyRegistry.get(attr.type);
      }
      return {
        replace: true,
        restrict: 'E',
        scope: {},
        tempalte: function(elem, attr) {
          return require('../views/providers/' + attr.type + '/add-account-item.pug');
        },
        link: link
      };
    })

    .directive('socialAccount', function() {
      return {
        replace: true,
        restrict: 'E',
        scope: {
          account: '='
        },
        tempalte: function(elem, attr) {
          return require('../views/providers/' + attr.type + '/account.pug');
        },
        controller: 'socialAccountController'
      };
    });
})(angular);
