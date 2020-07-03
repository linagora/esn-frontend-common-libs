'use strict';

(function(isNode, isAngular) {
  var charAPIModule = function() {
    var defaultDiacriticsMap = [
      {'base': 'A', 'letters': 'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯꜲÆǼǢꜴꜶꜸꜺꜼ'},
      {'base': 'B', 'letters': 'BⒷＢḂḄḆɃƂƁ'},
      {'base': 'C', 'letters': 'CⒸＣĆĈĊČÇḈƇȻꜾ'},
      {'base': 'D', 'letters': 'DⒹＤḊĎḌḐḒḎĐƋƊƉꝹǱǄǲǅ'},
      {'base': 'E', 'letters': 'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ'},
      {'base': 'F', 'letters': 'FⒻＦḞƑꝻ'},
      {'base': 'G', 'letters': 'GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ'},
      {'base': 'H', 'letters': 'HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ'},
      {'base': 'I', 'letters': 'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ'},
      {'base': 'J', 'letters': 'JⒿＪĴɈ'},
      {'base': 'K', 'letters': 'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ'},
      {'base': 'L', 'letters': 'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀǇǈ'},
      {'base': 'M', 'letters': 'MⓂＭḾṀṂⱮƜ'},
      {'base': 'N', 'letters': 'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤǊǋ'},
      {'base': 'O', 'letters': 'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌƢꝎȢ'},
      {'base': 'P', 'letters': 'PⓅＰṔṖƤⱣꝐꝒ'},
      {'base': 'Q', 'letters': 'QⓆＱꝖɊ'},
      {'base': 'R', 'letters': 'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ'},
      {'base': 'S', 'letters': 'SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ'},
      {'base': 'T', 'letters': 'TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆꜨ'},
      {'base': 'U', 'letters': 'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ'},
      {'base': 'V', 'letters': 'VⓋＶṼṾƲɅ'},
      {'base': 'W', 'letters': 'WⓌＷẀẂŴẆẄẈⱲ'},
      {'base': 'X', 'letters': 'XⓍＸẊẌ'},
      {'base': 'Y', 'letters': 'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ'},
      {'base': 'Z', 'letters': 'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫ'},
      {'base': 'a', 'letters': 'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐꜳæǽǣꜵꜷꜹꜻꜽ'},
      {'base': 'b', 'letters': 'bⓑｂḃḅḇƀƃɓ'},
      {'base': 'c', 'letters': 'cⓒｃćĉċčçḉƈȼꜿↄ'},
      {'base': 'd', 'letters': 'dⓓｄḋďḍḑḓḏđƌɖɗꝺǳǆ'},
      {'base': 'e', 'letters': 'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ'},
      {'base': 'f', 'letters': 'fⓕｆḟƒꝼ'},
      {'base': 'g', 'letters': 'gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ'},
      {'base': 'h', 'letters': 'hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥƕ'},
      {'base': 'i', 'letters': 'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı'},
      {'base': 'j', 'letters': 'jⓙｊĵǰɉ'},
      {'base': 'k', 'letters': 'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ'},
      {'base': 'l', 'letters': 'lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇǉ'},
      {'base': 'm', 'letters': 'mⓜｍḿṁṃɱɯ'},
      {'base': 'n', 'letters': 'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥǌ'},
      {'base': 'o', 'letters': 'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵƣȣꝏ'},
      {'base': 'p', 'letters': 'pⓟｐṕṗƥᵽꝑꝓ'},
      {'base': 'q', 'letters': 'qⓠｑɋꝗ'},
      {'base': 'r', 'letters': 'rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ'},
      {'base': 's', 'letters': 'sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ'},
      {'base': 't', 'letters': 'tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇꜩ'},
      {'base': 'u', 'letters': 'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ'},
      {'base': 'v', 'letters': 'vⓥｖṽṿʋʌ'},
      {'base': 'w', 'letters': 'wⓦｗẁẃŵẇẅẘẉⱳ'},
      {'base': 'x', 'letters': 'xⓧｘẋẍ'},
      {'base': 'y', 'letters': 'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ'},
      {'base': 'z', 'letters': 'zⓩｚźẑżžẓẕƶȥɀⱬ'}
    ];

    var uppercaseAsciiMap = [];

    for (var i = 0; i < defaultDiacriticsMap.length; i++) {
      for (var j = 0; j < defaultDiacriticsMap[i].letters.length; j++) {
        uppercaseAsciiMap[defaultDiacriticsMap[i].letters[j]] = defaultDiacriticsMap[i].base.toUpperCase();
      }
    }

    function getAsciiUpperCase(letter) {
      return uppercaseAsciiMap[letter];
    }

    return {
      getAsciiUpperCase: getAsciiUpperCase
    };
  };

  if (isAngular) {
    angular.module('esn.charAPI', [])
      .factory('charAPI', [charAPIModule]);
  } else if (isNode) {
    module.exports = charAPIModule();
  }

})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');
