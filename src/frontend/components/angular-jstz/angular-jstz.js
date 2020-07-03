/* angular-moment.js / v0.9.0 / (c) 2015  Czar Pino / MIT Licence */

(function (angular) {
    'use strict';

    angular.module('AngularJstz', [])
           .factory('jstz', ['$window', Jstz]);

    function Jstz($window) {
        return $window.jstz.jstz;
    }
})(window.angular);
