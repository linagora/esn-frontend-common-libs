(function() {
  /**
  * Utility function to create elements. If no tag name is given,
  * a DIV is created. Optionally properties can be passed.
  */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
  * Appends children and returns the parent.
  */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  function createStyleSheet() {
    var el = createEl('style', {type : 'text/css'});
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  };

  angular.module('openpaas-logo', [])
  .service('op:injectCss', function() {
    var rules = [
      '.openpaas-logo{width:11em;height:11em;position:relative;display:inline-block;}',
      '.openpaas-logo,.openpaas-logo>div{-moz-box-sizing:content-box;box-sizing:content-box;-webkit-box-sizing:content-box;}',
      '.openpaas-logo>.circle{position: absolute;border-radius:40em;height:4em;width:4em;border-width:1em;border-style:solid;}',
      '.openpaas-logo>.blue-circle{border-color:#2196F3;}',
      '.openpaas-logo>.yellow-circle{border-color:#FFC107;}',
      '.openpaas-logo>.grey-circle{border-color:#BDBDBD;}'
    ];

    var animrules = [
      '.openpaas-logo.spin>.blue-circle{animation:spin-blue 3s linear 0s infinite normal;}',
      '.openpaas-logo.spin>.yellow-circle{animation:spin-yellow 3s linear 0s infinite normal;}',
      '.openpaas-logo.spin>.grey-circle{animation:spin-grey 3s linear 0s infinite normal;}'
    ];

    var keyframesrules = [
      '@keyframes spin-blue{' +
        'from{transform:scale3d(0.8, 0.8, 1) translate3d(0, 0, 0);}' +
        '33%{transform:scale3d(1, 1, 1) translate3d(4.5em, 3.5em, 0);}' +
        '66%{transform:scale3d(0.4, 0.4, 1) translate3d(0, 10em, 0);}' +
        'to{transform:scale3d(0.8, 0.8, 1) translate3d(0, 0, 0);}' +
      '}',
      '@keyframes spin-yellow{' +
        'from{transform:scale3d(1, 1, 1) translate3d(4.5em, 3.5em, 0);}' +
        '33%{transform:scale3d(0.4, 0.4, 1) translate3d(0, 10em, 0);}' +
        '66%{transform:scale3d(0.8, 0.8, 1) translate3d(0, 0, 0);}' +
        'to{transform:scale3d(1, 1, 1) translate3d(4.5em, 3.5em, 0);}' +
      '}',
      '@keyframes spin-grey{' +
        'from{transform: scale3d(0.4, 0.4, 1) translate3d(0, 10em, 0);}' +
        '33%{transform: scale3d(0.8, 0.8, 1) translate3d(0, 0, 0);}' +
        '66%{transform: scale3d(1, 1, 1) translate3d(4.5em, 3.5em, 0);}' +
        'to{transform: scale3d(0.4, 0.4, 1) translate3d(0, 10em, 0);}' +
      '}'
    ];

    var sheet = createStyleSheet();

    rules.concat(animrules).concat(keyframesrules).forEach(function(rule) {
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch(e) {}
    });

  })
  .value('op:template', '<div class="openpaas-logo"><div class="circle grey-circle"></div><div class="circle yellow-circle"></div><div class="circle blue-circle"></div></div>')
  .factory('openpaasDomLogo', ['op:template', function(template) {
    return function openpaasDomLogo() {
      return angular.element(template)[0];
    };
  }])
  .directive('openpaasLogo', ['op:injectCss', 'op:template', function(foo, template) {
    return {
      restrict: 'EA',
      replace: true,
      template: template
    };
  }])
  .directive('openpaasLogoSpinner', ['openpaasDomLogo', 'op:injectCss', function(openpaasDomLogo) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.spinner = null;
        scope.size = angular.isDefined(attrs.spinnerSize) ? attrs.spinnerSize : false;
        scope.key = angular.isDefined(attrs.spinnerKey) ? attrs.spinnerKey : false;
        scope.spinnerClass = angular.isDefined(attrs.spinnerClass) ? attrs.spinnerClass : 'spin';
        scope.startActive = angular.isDefined(attrs.spinnerStartActive) ?
                            attrs.spinnerStartActive : !(scope.key);

        scope.spin = function() {
          if ( !scope.spinner ) {
            scope.spinner = openpaasDomLogo();
            if ( scope.size ) { scope.spinner.style.fontSize = scope.size+'em'; }
            scope.spinner.classList.add(scope.spinnerClass);
          }
          element[0].appendChild(scope.spinner);
        };

        scope.stop = function() {
          if ( !scope.spinner ) { return ; }
          element[0].removeChild(scope.spinner);
        };

        scope.$on('us-spinner:spin', function (event, key) {
          if(key === scope.key){ scope.spin(); }
        });

        scope.$on('us-spinner:stop', function (event, key) {
          if(key === scope.key){ scope.stop(); }
        });

        if ( scope.startActive ) {
          scope.spin();
        }
      }
    }
  }])
  .factory('usSpinnerService', ['$rootScope', function ($rootScope) {
    var config = {};

    config.spin = function (key) {
      $rootScope.$broadcast('us-spinner:spin', key);
    };

    config.stop = function (key) {
      $rootScope.$broadcast('us-spinner:stop', key);
    };

    return config;
  }]);
})();
