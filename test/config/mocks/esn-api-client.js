/* global sinon */

import rewiremock from 'rewiremock/webpack';

rewiremock(() => require('esn-api-client/src/Client')).withDefault(sinon.stub()).toBeUsed();

rewiremock.enable();
