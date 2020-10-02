/* global chai: false */

const { expect } = chai;
const { module, inject } = angular.mock;

describe('the esnI18n filter', function() {

  let esnI18nFilter;

  beforeEach(module('esn.i18n'));
  beforeEach(inject(function(_esnI18nFilter_) {
    esnI18nFilter = _esnI18nFilter_;
  }));

  it('should sanitize string', function() {
    expect(esnI18nFilter('<script>')).to.equal('&lt;script&gt;');
  });

  it('should not sanitize string when second argument is true', function() {
    expect(esnI18nFilter('<script>', true)).to.equal('<script>');
  });
});
