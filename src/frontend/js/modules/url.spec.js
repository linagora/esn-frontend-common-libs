'use strict';

/* global chai: false */

var { expect } = chai;

describe('The esn.url Angular module', function() {

  beforeEach(angular.mock.module('esn.url'));

  describe('The urlUtils service', function() {
    var urlUtils;

    beforeEach(function() {
      angular.mock.inject(function(_urlUtils_) {
        urlUtils = _urlUtils_;
      });
    });

    describe('The updateUrlParameter fn', function() {
      var DEFAULT_URL = 'http://linagora.com';
      var updateUrlParameter;

      beforeEach(function() {
        updateUrlParameter = urlUtils.updateUrlParameter;
      });

      it('should add parameter to URL', function() {
        var expectedUrl = DEFAULT_URL + '?key=value';

        expect(updateUrlParameter(DEFAULT_URL, 'key', 'value')).to.equal(expectedUrl);
      });

      it('should add parameter correctly when url already has parameters', function() {
        var inputUrl = DEFAULT_URL + '?x=1&y=2';
        var expectedUrl = DEFAULT_URL + '?x=1&y=2&z=3';

        expect(updateUrlParameter(inputUrl, 'z', '3')).to.equal(expectedUrl);
      });

      it('should update parameter to URL', function() {
        var inputUrl = DEFAULT_URL + '?key=value';
        var expectedUrl = DEFAULT_URL + '?key=otherValue';

        expect(updateUrlParameter(inputUrl, 'key', 'otherValue')).to.equal(expectedUrl);
      });

      it('should add parameter correctly when URL contains hash', function() {
        var inputUrl = DEFAULT_URL + '#contact';
        var expectedUrl = DEFAULT_URL + '?key=value#contact';

        expect(updateUrlParameter(inputUrl, 'key', 'value')).to.equal(expectedUrl);
      });

      it('should add parameter correctly when url already has parameters and hash', function() {
        var inputUrl = DEFAULT_URL + '?x=1&y=2#contact';
        var expectedUrl = DEFAULT_URL + '?x=1&y=2&z=3#contact';

        expect(updateUrlParameter(inputUrl, 'z', '3')).to.equal(expectedUrl);
      });

      it('should update parameter correctly when URL contains hash', function() {
        var inputUrl = DEFAULT_URL + '?key=value#contact';
        var expectedUrl = DEFAULT_URL + '?key=otherValue#contact';

        expect(updateUrlParameter(inputUrl, 'key', 'otherValue')).to.equal(expectedUrl);
      });

      it('should encode value before adding to parameter', function() {
        var expectedUrl = DEFAULT_URL + '?key=encode%20this';

        expect(updateUrlParameter(DEFAULT_URL, 'key', 'encode this')).to.equal(expectedUrl);
      });

    });

    describe('The isValidURL function', function() {
      it('should return true if the string is a valid absolute URL', function() {
        expect(urlUtils.isValidURL('http://123.com')).to.be.true;
      });

      it('should return true if the string is a valid relative URL', function() {
        expect(urlUtils.isValidURL('123.com')).to.be.true;
      });

      it('should return false if it is not a string', function() {
        expect(urlUtils.isValidURL(123)).to.be.false;
      });

      it('should return false if the string is empty', function() {
        expect(urlUtils.isValidURL('')).to.be.false;
      });

      it('should return false if the string is not a valid URL', function() {
        expect(urlUtils.isValidURL('/123')).to.be.false;
      });
    });

    describe('The isAbsoluteURL function', function() {
      it('should return true if the url is an absolute URL', function() {
        expect(urlUtils.isAbsoluteURL('http://123.com')).to.be.true;
      });

      it('should return false if the url is a relative URL', function() {
        expect(urlUtils.isAbsoluteURL('123.com')).to.be.false;
      });

      it('should return false if the url is invalid', function() {
        expect(urlUtils.isAbsoluteURL('someinvalid/string')).to.be.false;
      });

      it('should return false if the url is not a string', function() {
        expect(urlUtils.isAbsoluteURL(123)).to.be.false;
      });
    });
  });

  describe('The absoluteUrl factory', function() {

    var absoluteUrl;

    beforeEach(angular.mock.inject(function(_absoluteUrl_) {
      absoluteUrl = _absoluteUrl_;
    }));

    it('should return an absolute URL', function() {
      expect(absoluteUrl('/test')).to.match(/http[s]?:\/\/.+?\/test/);
    });

  });

});
