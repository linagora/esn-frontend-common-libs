(function(angular) {
  'use strict';

  angular.module('esn.header', [
    'ui.router',
    'hl.sticky',
    'esn.feature-registry',
    'esn.sidebar',
    'esn.subheader',
    'matchmedia-ng',
    'esn.media.query',
    'esn.core',
    'esn.profile',
    'esn.search',
    'esn.profile-menu',
    'mgcrea.ngStrap.popover',
    'FBAngular'
  ])

    .constant('MAIN_HEADER', 'main-header-middle-content')

    .constant('SUB_HEADER', 'sub-header-content')

    .constant('SUB_HEADER_HAS_INJECTION_EVENT', 'sub-header:hasInjection')

    .constant('ESN_HEADER_HEIGHT_MD', 56)

    .constant('ESN_HEADER_HEIGHT_XL', 65)

    .constant('ESN_SUBHEADER_HEIGHT_XS', 56)

    .constant('ESN_SUBHEADER_HEIGHT_MD', 47)

    .constant('APPLICATION_GRID_ACCOUNT_SPA_NAME', 'Account')

    .factory('headerService', function($rootScope, dynamicDirectiveService, MAIN_HEADER, SUB_HEADER, SUB_HEADER_HAS_INJECTION_EVENT) {

      function buildDynamicDirective(directiveName, scope) {
        return new dynamicDirectiveService.DynamicDirective(true, directiveName, { scope: scope });
      }

      function addMainHeaderInjection(directiveName) {
        var directive = buildDynamicDirective(directiveName);

        dynamicDirectiveService.addInjection(MAIN_HEADER, directive);
      }

      function hasMainHeaderGotInjections() {
        return dynamicDirectiveService.getInjections(MAIN_HEADER, {}).length > 0;
      }

      function hasSubHeaderGotInjections() {
        return dynamicDirectiveService.getInjections(SUB_HEADER, {}).length > 0;
      }

      function addSubHeaderInjection(directiveName, scope) {
        var directive = buildDynamicDirective(directiveName, scope);

        dynamicDirectiveService.addInjection(SUB_HEADER, directive);
        $rootScope.$broadcast(SUB_HEADER_HAS_INJECTION_EVENT, hasSubHeaderGotInjections());
      }

      function setSubHeaderInjection(directiveName, scope) {
        resetSubHeaderInjection();
        addSubHeaderInjection(directiveName, scope);
      }

      function resetMainHeaderInjection() {
        dynamicDirectiveService.resetInjections(MAIN_HEADER);
      }

      function resetSubHeaderInjection() {
        dynamicDirectiveService.resetInjections(SUB_HEADER);
      }

      return {
        mainHeader: {
          addInjection: addMainHeaderInjection,
          resetInjections: resetMainHeaderInjection,
          hasInjections: hasMainHeaderGotInjections
        },
        subHeader: {
          addInjection: addSubHeaderInjection,
          setInjection: setSubHeaderInjection,
          resetInjections: resetSubHeaderInjection,
          hasInjections: hasSubHeaderGotInjections
        },
        resetAllInjections: function() {
          resetMainHeaderInjection();
          resetSubHeaderInjection();
        }
      };
    })

    .directive('mainHeaderContent', function() {
      return {
        restrict: 'E',
        template: '<span>OpenPaas</span>',
        replace: true
      };
    })

    .directive('mainHeader', function(matchmedia, headerService, Fullscreen, session, esnRestangular,
      SUB_HEADER_HAS_INJECTION_EVENT, ESN_MEDIA_QUERY_SM_XS, $rootScope) {
      return {
        restrict: 'E',
        replace: true,
        template: require('../../../views/modules/header/header.pug'),
        link: function(scope) {
        // We need this second variable because matchmedia.on is called too many times,
        // for instance when top or bottom bars of mobiles finish moving.
          scope.disableByEvent = false;

          scope.toggleFullScreen = function() {
            Fullscreen.toggleAll();
          };

          scope.toggleSideMenu = function() {
            $rootScope.$broadcast('toggleSideMenu', true);
          };

          scope.domainId = session.domain._id;
          scope.baseUrl = window.openpaas && window.openpaas.OPENPAAS_API_URL || '';

          esnRestangular.one('themes', scope.domainId)
            .withHttpConfig({ responseType: 'arraybuffer' })
            .customGET('logo').then(function(response) {
              const blob = new Blob(
                [response.data], { type: response.headers('Content-Type') }
              );

              scope.logoUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            }, () => {
              scope.logoUrl = 'assets/images/white-logo.svg';
            });

          var unregister = matchmedia.on(ESN_MEDIA_QUERY_SM_XS, function(mediaQueryList) {
            scope.enableScrollListener = mediaQueryList.matches;
          }, scope);

          scope.$on('$destroy', unregister);

          scope.hasSubHeaderGotInjections = headerService.subHeader.hasInjections();

          scope.$on(SUB_HEADER_HAS_INJECTION_EVENT, function(event, hasInjections) {
            scope.hasSubHeaderGotInjections = hasInjections;
          });

          scope.$on('$stateChangeSuccess', function() {
            scope.subHeaderVisibleMd = false;
          });
        }
      };
    });

})(angular);

require('../core.js');
require('../feature-registry/feature-registry.module.js');
require('../media-query.js');
require('../profile.js');
require('../search/search.module.js');
require('../sidebar.js');
require('../subheader/subheader.module.js');
require('./sticky/header-sticky.directive.js');
require('./header-featureflip.run.js');
