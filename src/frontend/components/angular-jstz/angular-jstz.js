'use strict';

const jstz = require('../jstzdetect/jstz');

angular.module('AngularJstz', [])
    .factory('jstz', Jstz);

function Jstz() {
    return jstz.jstz;
}
