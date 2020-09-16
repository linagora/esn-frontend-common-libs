'use strict';

/* global chai: false */
/* global sinon: false */

var { expect } = chai;

describe('The esn.previous-page module', function() {

  var $window, $state, esnPreviousPage, $compile, $scope, $rootScope, element;

  beforeEach(angular.mock.module('esn.previous-page', function($provide) {
    $window = {
      history: {
        back: sinon.spy()
      }
    };

    $provide.value('$state', $state = {
      go: sinon.spy(),
      get: sinon.stub().returns([
        {
          default: true,
          name: 'expected.default.state'
        },
        {
          name: 'expected.state'
        }
      ])
    });
    $provide.value('$window', $window);
  }));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _esnPreviousPage_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    esnPreviousPage = _esnPreviousPage_;
  }));

  describe('the esnPreviousPage factory', function() {

    describe('The back() Function', function() {

      it('should call $window.history.back if there is previous state and browser history records', function() {
        $window.history.length = 10;
        $rootScope.$emit('$stateChangeStart', null, null, null, null, { location: true });

        esnPreviousPage.back();

        expect($window.history.back).to.have.been.called;
      });

      it('should go to default state if there is no previous state', function() {
        $window.history.length = 10;

        esnPreviousPage.back('expected.state');

        expect($window.history.back).to.not.have.been.called;
        expect($state.go).to.have.been.calledWith('expected.state');
      });

      it('should go to default state if there is previous state but no record in browser history', function() {
        $window.history.length = null;

        esnPreviousPage.back('expected.state');
        $rootScope.$emit('$stateChangeStart', null, null, null, null, { location: true });

        expect($window.history.back).to.not.have.been.called;
        expect($state.go).to.have.been.calledWith('expected.state');
      });

      it('should go to the default state if the history.back is prevented', () => {
        $window.history.length = 10;

        $rootScope.$emit('$stateChangeStart', null, null, null, null, { location: true });
        esnPreviousPage.back('expected.state', true);

        expect($window.history.back).to.not.have.been.called;
        expect($state.go).to.have.been.calledWith('expected.state');
      });
    });
  });

  describe('The esnBackButton directive', function() {
    function compileDirective(html, data) {
      element = angular.element(html);
      element.appendTo(document.body);

      if (data) {
        angular.forEach(data, function(value, key) {
          element.data(key, value);
        });
      }

      $compile(element)($scope);
      $scope.$digest();

      return element;
    }

    beforeEach(function() {
      $scope = $rootScope.$new();

      compileDirective('<button esn-back-button="expected.default.state" />');
    });

    afterEach(function() {
      if (element) {
        element.remove();
      }
    });

    it('should call esnPreviousPage.back', function() {
      esnPreviousPage.back = sinon.spy();

      element.click();

      expect(esnPreviousPage.back).to.have.been.calledOnce;
    });

    it('should call esnPreviousPage.back with preventHistoryBack if the attribute exists', () => {
      esnPreviousPage.back = sinon.spy();
      $scope = $rootScope.$new();

      compileDirective('<button prevent-history-back="" esn-back-button="expected.state" />');
      element.click();

      expect(esnPreviousPage.back).to.have.been.calledWith('expected.state', true);
    });

    it('should call esnPreviousPage with the default state if the provided state does not exist', () => {
      esnPreviousPage.back = sinon.spy();
      $scope = $rootScope.$new();

      compileDirective('<button esn-back-button="something.not.expected" />');
      element.click();

      expect(esnPreviousPage.back).to.have.been.calledWith('expected.default.state', false);
    });
  });

});
