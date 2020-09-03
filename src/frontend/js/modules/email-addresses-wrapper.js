'use strict';

const emailAddresses = require('email-addresses');

angular.module('esn.email-addresses-wrapper', [])

  .factory('emailAddresses', function() {
    return emailAddresses;
  });
