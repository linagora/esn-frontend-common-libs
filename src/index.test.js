window.jstz = require('./frontend/components/jstzdetect/jstz.js');
window.jQuery = require('jquery/dist/jquery.js');
window.$ = window.jQuery;

require('./frontend/vendor-libs.js');
require('./modules/linagora.esn.account');
require('./modules/linagora.esn.graceperiod');
require('./modules/linagora.esn.oauth.consumer');
require('./modules/linagora.esn.user.status');
require('angular-moment/angular-moment.js');
require('angular-strap/dist/angular-strap.js');
require('angular-animate/angular-animate.js');
require('angular-messages/angular-messages.js');
require('angular-feature-flags/dist/featureFlags.js');
require('angular-ui-router/release/angular-ui-router.js');
require('angular-material/angular-material.js');
require('matchmedia-ng/matchmedia-ng.js');
require('bootstrap/dist/js/bootstrap.js');
require('angular-promise-extras/angular-promise-extras.js');
require('angular-touch/angular-touch.js');
require('ng-tags-input/build/ng-tags-input.js');
require('moment-timezone/builds/moment-timezone-with-data-2012-2022.js');
require('async/dist/async.js');
require('angular-mocks/angular-mocks.js');

require('../test/frontend/karma-include/injector.js');
require('../test/config/cucumber.conf.js');
require('../test/fixtures/code-generation/constants.js');
require('../test/fixtures/code-generation/constants-with-overrides.js');
require('../test/fixtures/errors.js');
require('../test/fixtures/logger-noop.js');

var sinonChai = require('sinon-chai/lib/sinon-chai.js');
var shallowDeepEqual = require('chai-shallow-deep-equal/chai-shallow-deep-equal.js');
var chaiDatetime = require('chai-datetime/chai-datetime.js');

/* global chai */
chai.use(sinonChai);
chai.use(shallowDeepEqual);
chai.use(chaiDatetime);

// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('.', true, /\.spec$/);

testsContext.keys().forEach(testsContext);
