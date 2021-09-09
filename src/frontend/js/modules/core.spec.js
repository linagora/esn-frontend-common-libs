'use strict';

const DOMPurify = require('dompurify/dist/purify.js');

/* global chai, sinon: false */

var { expect } = chai;

describe('The Angular core module', function() {
  beforeEach(angular.mock.module('esn.core'));

  describe('CounterFactory', function() {
    var service, $log, $timeout, $q, unreadDefer, $rootScope;
    var counter, timeoutToTest, callTimes, refreshFn;

    beforeEach(function() {
      callTimes = 0;
      refreshFn = function() {
        unreadDefer = $q.defer();

        return unreadDefer.promise;
      };

      $log = {
        debug: function() {},
        info: function() {},
        error: function() {}
      };

      $timeout = function(fn, timeout) {
        timeoutToTest = timeout;
        callTimes++;
        setTimeout(fn, 100);
      };

      angular.mock.module(function($provide) {
        $provide.value('$log', $log);
        $provide.value('$timeout', $timeout);
      });
    });

    // Using the global $q instead causes strange test failures that I cannot
    // find a solution to. Remove with caution.
    beforeEach(angular.mock.inject(function($injector, _$q_, _$rootScope_) {
      service = $injector.get('CounterFactory');
      $q = _$q_;
      $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
      timeoutToTest = null;
      callTimes = null;
      counter = service.newCounter(42, 10 * 1000, refreshFn);
    });

    it('should decreaseBy 1 count', function() {
      counter.decreaseBy(1);
      expect(counter.count).to.equals(41);
    });

    it('should increaseBy 1 count', function() {
      counter.increaseBy(1);
      expect(counter.count).to.equals(43);
    });

    it('should allow refreshing the count by calling getUnreadCount after 10 seconds', function() {
      counter.refresh();

      setTimeout(function() {
        unreadDefer.resolve(420);
        $rootScope.$digest();

        expect(counter.count).to.equals(420);
        expect(timeoutToTest).to.equals(10 * 1000);
      }, 200);
    });

    it('should allow set initial count by calling getUnreadCount function directly', function() {
      counter.init();

      unreadDefer.resolve(420);
      $rootScope.$digest();

      expect(counter.count).to.equals(420);
    });

    it('should not call getUnreadCount if the timer is already up', function() {
      counter.refresh();
      counter.refresh();
      counter.refresh();
      counter.refresh();

      setTimeout(function() {
        unreadDefer.resolve(420);
        $rootScope.$digest();

        expect(counter.count).to.equals(420);
        expect(callTimes).to.equals(1);
        expect(timeoutToTest).to.equals(10 * 1000);
      }, 200);
    });

  });

  describe('The bytes filter', function() {

    var bytes;

    beforeEach(angular.mock.inject(function($filter) {
      bytes = $filter('bytes');
    }));

    it('should return nothing when there is no filesize', function() {
      expect(bytes('text')).to.equal('-');
    });

    it('should round the filesize based on the configured precision', function() {
      var size = 1024 + 512;

      expect(bytes(size)).to.equal('1.5KB');
      expect(bytes(size, 2)).to.equal('1.50KB');
    });

    it('should recognize bytes', function() {
      expect(bytes(1, 0)).to.equal('1bytes');
    });

    it('should recognize KiloBytes', function() {
      expect(bytes(Math.pow(1024, 1), 0)).to.equal('1KB');
    });

    it('should recognize MegaBytes', function() {
      expect(bytes(Math.pow(1024, 2), 0)).to.equal('1MB');
    });

    it('should recognize GigaBytes', function() {
      expect(bytes(Math.pow(1024, 3), 0)).to.equal('1GB');
    });

    it('should recognize TeraBytes', function() {
      expect(bytes(Math.pow(1024, 4), 0)).to.equal('1TB');
    });

    it('should recognize PetaBytes', function() {
      expect(bytes(Math.pow(1024, 5), 0)).to.equal('1PB');
    });
  });

  describe('The prefixLink filter', function() {
    var prefixLink;

    beforeEach(angular.mock.inject(function($filter) {
      prefixLink = $filter('prefixLink');
    }));

    it('should return original input if type is undefined', function() {
      var input = 'abcxyz';

      expect(prefixLink(input)).to.equal(input);
    });

    it('should ignore type case', function() {
      expect(prefixLink('abc.com', 'http')).to.equal('http://abc.com');
      expect(prefixLink('abc.com', 'HTTP')).to.equal('http://abc.com');
    });

    describe('The http type', function() {
      var type = 'http';

      it('should prefix http:// when it is not present', function() {
        expect(prefixLink('abc.com', type)).to.equal('http://abc.com');
      });

      it('should return original input when http:// is present', function() {
        expect(prefixLink('http://abc.com', type)).to.equal('http://abc.com');
      });

      it('should return original input when https:// is present', function() {
        expect(prefixLink('https://abc.com', type)).to.equal('https://abc.com');
      });
    });

    describe('The skype type', function() {
      var type = 'skype';

      it('should prefix skype: when it is not present', function() {
        expect(prefixLink('linagora', type)).to.equal('skype:linagora');
      });

      it('should return original input when skype: is present', function() {
        expect(prefixLink('skype:linagora', type)).to.equal('skype:linagora');
      });

    });

    describe('The twitter type', function() {
      var type = 'twitter';

      it('should prefix http://twitter.com/ when it is not present', function() {
        expect(prefixLink('linagora', type)).to.equal('http://twitter.com/linagora');
      });

      it('should return original input when http://twitter.com/ is present', function() {
        expect(prefixLink('http://twitter.com/linagora', type)).to.equal('http://twitter.com/linagora');
      });

      it('should return original input when https://twitter.com/ is present', function() {
        expect(prefixLink('https://twitter.com/linagora', type)).to.equal('https://twitter.com/linagora');
      });

    });

  });

  describe('The maxPlus filter', function() {

    var maxPlus;

    beforeEach(angular.mock.inject(function($filter) {
      maxPlus = $filter('maxPlus');
    }));

    it('should return maxValue+ when the input is greater than maxValue', function() {
      expect(maxPlus(100, 99)).to.equal('99+');
    });

    it('should return the original input when it is not greater than maxValue', function() {
      expect(maxPlus(99, 99)).to.equal(99);
    });

  });

  describe('The urlencode filter', function() {
    var urlencode;

    beforeEach(angular.mock.inject(function($filter) {
      urlencode = $filter('urlencode');
    }));

    it('should encode things', function() {
      expect(urlencode('#$%@&ing tests!')).to.equal('%23%24%25%40%26ing%20tests!');
    });
  });

  describe('The emailService service', function() {
    beforeEach(angular.mock.inject(function(emailService) {
      this.emailService = emailService;
    }));

    describe('the isValidEmail function', function() {
      it('should return false for undefined', function() {
        expect(this.emailService.isValidEmail()).to.be.false;
      });

      it('should return false for empty string', function() {
        expect(this.emailService.isValidEmail('')).to.be.false;
      });

      it('should return false for an invalid email', function() {
        expect(this.emailService.isValidEmail('notanEmail')).to.be.false;
        expect(this.emailService.isValidEmail('notOnlyEmail test@yolo.com')).to.be.false;
        expect(this.emailService.isValidEmail('notOnlyEmail..test@yolo.com')).to.be.false;
      });

      it('should return true for a valid email', function() {
        expect(this.emailService.isValidEmail('te.st@yolo.com')).to.be.true;
      });
    });
  });

  describe('The clickOutside directive', function() {

    beforeEach(function() {
      angular.mock.module('esn.core');
    });

    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$document_) {
      this.$rootScope = _$rootScope_;
      this.$scope = this.$rootScope.$new();
      this.$compile = _$compile_;
      this.$document = _$document_;
    }));

    it('should call the action when user clicks outside of the element', function(done) {
      this.$scope.callMe = function() {
        done();
      };
      var element = this.$compile('<div><div click-outside="callMe()"><span>Hello</span></div></div>')(this.$scope);
      var body = this.$document.find('body').eq(0);

      body.append(element);
      this.$scope.$digest();
      element.click();
    });

    it('should not call the action when user clicks inside of the element', function(done) {
      this.$scope.callMe = function() {
        done(new Error());
      };
      var element = this.$compile('<div><div click-outside="callMe()"><span class="findme">Hello</span></div></div>')(this.$scope);

      this.$scope.$digest();
      var body = this.$document.find('body').eq(0);

      body.append(element);
      element.find('.findme').click();
      done();
    });
  });

  describe('The navigateTo factory', function() {

    var $window, navigateTo;

    beforeEach(function() {
      angular.mock.module('esn.core', function($provide) {
        $provide.value('$window', $window = {});
      });
    });

    beforeEach(angular.mock.inject(function(_$window_, _navigateTo_) {
      $window = _$window_;
      navigateTo = _navigateTo_;
    }));

    it('should set $window.location to the target URL', function() {
      navigateTo('https://open-paas.org');

      expect($window.location).to.equal('https://open-paas.org');
    });

  });

  describe('esnWithPromiseResult', function() {
    var deferred, $q, promise, esnWithPromiseResult, $rootScope;

    beforeEach(angular.mock.inject(function(_$q_, _esnWithPromiseResult_, _$rootScope_) {
      $q = _$q_;
      deferred = $q.defer();
      promise = deferred.promise;
      esnWithPromiseResult = _esnWithPromiseResult_;
      $rootScope = _$rootScope_;
    }));

    it('should create a function that call the success callback if the promess succeed with the promise result plus the argument gived to the callback', function() {
      var spy = sinon.spy();
      var errorSpy = sinon.spy();
      var callback = esnWithPromiseResult(promise, spy, errorSpy);

      callback(1, 2, 3, 4, 5);
      expect(spy).to.have.not.been.called;
      deferred.resolve(0);
      $rootScope.$digest();
      expect(spy).to.have.been.calledWith(0, 1, 2, 3, 4, 5);
      expect(errorSpy).to.have.not.been.called;
    });

    it('should create a function that call the error callback if the promess fail with the promise result plus the argument gived to the callback', function() {
      var spy = sinon.spy();
      var errorSpy = sinon.spy();
      var callback = esnWithPromiseResult(promise, spy, errorSpy);

      callback(1, 2, 3, 4, [5, 6]);
      expect(errorSpy).to.have.not.been.called;
      deferred.reject(0);
      $rootScope.$digest();
      expect(errorSpy).to.have.been.calledWith(0, 1, 2, 3, 4, [5, 6]);
      expect(spy).to.have.not.been.called;
    });

    it('should not fail if the error callback is undefined or null if the promise success', function() {
      var spy = sinon.spy();
      var callback = esnWithPromiseResult(promise, spy, null);

      callback(1);
      deferred.resolve(0);
      $rootScope.$digest();
      expect(spy).to.have.been.calledWith(0, 1);
    });

    it('should not fail if the error callback is undefined or null if the promise success', function() {
      var spy = sinon.spy();
      var callback = esnWithPromiseResult(promise, spy, null);

      callback(1);
      deferred.resolve(0);
      $rootScope.$digest();
      expect(spy).to.have.been.calledWith(0, 1);
    });

    it('should not fail and do nothing if the error callback is undefined or null if the promise fail', function() {
      var spy = sinon.spy();
      var callback = esnWithPromiseResult(promise, spy, null);

      callback(1);
      deferred.reject(0);
      $rootScope.$digest();
      expect(spy).to.not.have.been.called;
    });

    it('should not fail if the success callback is undefined or null if the promise fail', function() {
      [null, undefined].forEach(function(nullable) {
        var errorSpy = sinon.spy();
        var callback = esnWithPromiseResult(promise, nullable, errorSpy);

        callback(1);
        deferred.reject(0);
        $rootScope.$digest();
        expect(errorSpy).to.have.been.calledWith(0, 1);
      });
    });

    it('should not fail and do nothing if the success callback is undefined or null if the promise success', function() {
      [null, undefined].forEach(function(nullable) {
        var errorSpy = sinon.spy();
        var callback = esnWithPromiseResult(promise, nullable, errorSpy);

        callback(1);
        deferred.resolve(0);
        $rootScope.$digest();
        expect(errorSpy).to.not.have.been.called;
      });
    });
  });

  describe('The esnDomPurify filter', function() {
    let esnDomPurify, $sce;

    beforeEach(function() {
      angular.mock.inject(function($window, $filter, _$sce_) {
        $window.DOMPurify = DOMPurify;
        esnDomPurify = $filter('esnDomPurify');
        $sce = _$sce_;
      });
    });

    it('should prefix ids and class, add div container and modify css selectors', function() {
      const input =
      `
      <style>
      .test-class {
        color: #ffffff;
      }
      #test-id {
        height: 10px;
      }
      div {
        display: none;
      }
      div#test-id {
        height: 20px;
      }
      #test-id div.test-class {
        height: 30px;
      }
      #test-id > .test-class {
        height: 40px;
      }
      </style>
      <div>
        <p id="test-id">Hello</p>
        <div class="test-class">World</div>
      </div>
      `;
      const expectedOutput =
      `
      <div class="mail_container">
      <html><head>
      <style>
      .mail_container .x_test-class {
        color: #ffffff;
      }
      .mail_container #x_test-id {
        height: 10px;
      }
      .mail_container div {
        display: none;
      }
      .mail_container div#x_test-id {
        height: 20px;
      }
      .mail_container #x_test-id div.x_test-class {
        height: 30px;
      }
      .mail_container #x_test-id > .x_test-class {
        height: 40px;
      }
      </style>
      </head><body>
      <div>
        <p id="x_test-id">Hello</p>
        <div class="x_test-class">World</div>
      </div>
      </body></html>
      </div>
      `.replaceAll(/\s/g, '');

      const ouput = $sce.valueOf(esnDomPurify(input)).replaceAll(/\s/g, '');

      expect(ouput).to.equal(expectedOutput);
    });
  });
});
