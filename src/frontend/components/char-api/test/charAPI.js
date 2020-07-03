'use strict';
/* global chai: false */
var expect = chai.expect;

describe('The charAPI module', function() {
  beforeEach(angular.mock.module('esn.charAPI'));

  describe('The charAPI factory', function() {

    var charAPI;

    beforeEach(angular.mock.inject(function($injector) {
      charAPI = $injector.get('charAPI');
    }));

    it('should get the correct uppercase letter without accents', function() {
      var lettersLowerCase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàáảãạăằắẳẵặâầấẩẫậäÀÁẢẠĂẰẮẲẴẶÂẦẤẨẪẬÄÈÉẺẼẸÊỀẾỂỄỆËèéẻẽêẹềểếễệëìíỉĩịÌÍỈĨỊïÏÒÓỎÕỌÔỐỒỔỖỘƠỜỚỞỠỢòóỏõọôồốổỗộơờớởỡợöÖùúủũụưừứửữựỰỮỬỨỪƯỤŨỦÚÙÛüÜỲÝỶỸỴỳýỷỹỵÿŸđĐ';
      var lettersUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOUUUUUUUUUUUUUUUUUUUUUUUUUYYYYYYYYYYYYDD';

      for (var i = 0; i < lettersLowerCase.length; i++) {
        expect(charAPI.getAsciiUpperCase(lettersLowerCase.charAt(i))).to.equals(lettersUpperCase.charAt(i));
      }
    });

  });
});
