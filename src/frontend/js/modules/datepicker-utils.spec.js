'use strict';

/* global chai, sinon, moment: false */

const { expect } = chai;

describe('The datepicker utils module', function() {
  let bsDatepickerDirective, clockpickerDefaultOptions, bsDatepickerMobileWrapper;
  let detectUtilsMock, ngModelControllerMock, getRequiredControllerMock, bsDatepickerMobileWrapperMock;
  let link, mobile, rawDirective, scope, element, attr, wrapDirective;

  beforeEach(function() {
    angular.mock.module('esn.datepickerUtils');
  });

  describe('the module config', function() {
    beforeEach(function() {
      bsDatepickerMobileWrapperMock = sinon.spy();
      angular.mock.module(function($provide) {
        $provide.value('bsDatepickerMobileWrapper', bsDatepickerMobileWrapperMock);
      });
    });

    beforeEach(angular.mock.inject(function(_bsDatepickerDirective_, _clockpickerDefaultOptions_) {
      bsDatepickerDirective = _bsDatepickerDirective_;
      clockpickerDefaultOptions = _clockpickerDefaultOptions_;
    }));

    it('should decorate clockpickerDefaultOptions to add nativeOnMobile', function() {
      expect(clockpickerDefaultOptions.nativeOnMobile).to.be.true;
    });

    it('should decorate bsDatepicker directive', function() {
      expect(bsDatepickerMobileWrapperMock).to.have.been.calledWith(bsDatepickerDirective[0]);
    });
  });

  describe('getRequiredController', function() {
    let getRequiredController;

    beforeEach(angular.mock.inject(function(_getRequiredController_) {
      getRequiredController = _getRequiredController_;
    }));

    it('should fail if require is not a array but is not the expected controller', function() {
      expect(getRequiredController.bind(null, 'controllerName', {}, { require: 'badRequire' })).to.throw(Error);
    });

    it('should fail if require is a array that does not contains the expected controller', function() {
      expect(getRequiredController.bind(null, 'controllerName', [{}], { require: ['badRequire'] })).to.throw(Error);
    });

    it('should return given controller if require is a string and correct', function() {
      const controller = {};

      expect(getRequiredController('controllerName', controller, { require: 'controllerName' })).to.equal(controller);
    });

    it('should return given controller if require and controller are array that contain expected require', function() {
      const controller = {};
      const controllers = [{}, controller, {}];
      const directive = { require: ['toto', 'controllerName', ''] };

      expect(getRequiredController('controllerName', controllers, directive)).to.equal(controller);
    });

  });

  describe('bsDatepickerMobileWrapper factory', function() {

    beforeEach(function() {
      mobile = true;

      detectUtilsMock = {
        isMobile: sinon.spy(function() {
          return mobile;
        })
      };

      link = sinon.stub();

      rawDirective = {
        require: 'ngModel',
        link: link,
        compile: sinon.stub().returns(link)
      };

      scope = {};

      element = {
        attr: sinon.stub()
      };

      attr = {
        $observe: sinon.stub()
      };

      ngModelControllerMock = {
        $formatters: [42],
        $parsers: [42]
      };

      getRequiredControllerMock = sinon.stub().returns(ngModelControllerMock);

      angular.mock.module(function($provide) {
        $provide.value('detectUtils', detectUtilsMock);
        $provide.value('getRequiredController', getRequiredControllerMock);
      });

      wrapDirective = function() {
        bsDatepickerMobileWrapper(rawDirective);
        link = rawDirective.compile();
        link(scope, element, attr, ngModelControllerMock);
      };

      angular.mock.inject(function(_bsDatepickerMobileWrapper_) {
        bsDatepickerMobileWrapper = _bsDatepickerMobileWrapper_;
        wrapDirective();
      });
    });

    it('should call getRequiredController to get the ngModelController', function() {
      wrapDirective();
      expect(getRequiredControllerMock).to.have.been.calledWith('ngModel', ngModelControllerMock, rawDirective);
    });

    it('should call original link if not on mobile phone', function() {
      mobile = false;
      wrapDirective();
      expect(detectUtilsMock.isMobile).to.have.beenCalledTwice;
      expect(rawDirective.link).to.have.been.calledWith(scope, element, attr, ngModelControllerMock);
    });

    it('should set a min and max value on mobile to avoid lag on chrome in android 5', function() {
      expect(element.attr).to.have.been.calledWith('min', '1800-01-01');
      expect(element.attr).to.have.been.calledWith('max', '3000-01-01');
    });

    it('should not set a min and max value on desktop', function() {
      mobile = false;
      element.attr.reset();
      wrapDirective();
      expect(element.attr).to.not.have.been.calledWith('min', '1800-01-01');
      expect(element.attr).to.not.have.been.calledWith('max', '3000-01-01');
    });

    it('should not call original link if on mobile phone', function() {
      expect(detectUtilsMock.isMobile).to.have.beenCalledOnce;
      expect(rawDirective.link).to.have.not.been.called;
    });

    it('should set element type to date only on mobile', function() {
      expect(element.attr).to.have.been.calledWith('type', 'date');
      mobile = false;
      element.attr.reset();
      wrapDirective();
      expect(element.attr).to.have.not.been.calledWith('type', 'date');
    });

    it('should push a correct formatter in ngModel', function() {
      expect(ngModelControllerMock.$formatters).to.shallowDeepEqual({
        length: 2,
        0: 42
      });

      const formatter = ngModelControllerMock.$formatters[1];

      expect(formatter(moment('1991-10-03').toDate())).to.equal('1991-10-03');
    });

    it('should unshift a correct parser in ngModel', function() {
      expect(ngModelControllerMock.$parsers).to.shallowDeepEqual({
        length: 2,
        1: 42
      });
    });

    describe('unshift parser', function() {
      let parser;

      beforeEach(function() {
        parser = ngModelControllerMock.$parsers[0];
      });

      it('should parse a date correctly', function() {
        const strDate = '1991-10-03';
        const date = parser(strDate);

        expect(moment(date).format('YYYY-MM-DD')).to.equal(strDate);
      });

      it('should return a raw js date object', function() {
        expect(parser('1991-10-03') instanceof Date).to.be.true;
      });

      it('should keep hour of previous date if any', function() {
        ngModelControllerMock.$modelValue = moment('1941-09-15 12:42');
        const date = parser('2016-01-28');

        expect(moment(date).format('YYYY-MM-DD HH:mm')).to.equal('2016-01-28 12:42');
      });
    });

    it('should observe properly minDate an maxDate and transfer them to min and max', function() {
      element.attr.reset();
      [{
        sourceField: 'minDate',
        destField: 'min'
      }, {
        sourceField: 'maxDate',
        destField: 'max'
      }].forEach(function(o) {
        expect(attr.$observe).to.have.been.calledWith(o.sourceField, sinon.match(function(fn) {
          fn('');
          expect(element.attr).to.have.not.been.calledWith(o.destField);
          fn('1991-10-03 10:32');
          expect(element.attr).to.have.been.calledWith(o.destField, '1991-10-03');

          return true;
        }));
      }, this);
    });
  });
});
