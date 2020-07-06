(function(angular) {
  'use strict';

  angular.module('esn.attachment', [
    'esn.aggregator',
    'esn.infinite-list',
    'esn.file',
    'esn.provider',
    'esn.core',
    'esn.registry',
    'esn.file-saver',
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.buffering',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay'
  ]);
})(angular);

require('../aggregator.js');
require('../file.js');
require('../infinite-list/infinite-list.module.js');
require('../provider.js');
require('../registry.js');
require('./attachment.constant.js');
require('./attachment.component.js');
require('./attachment.controller.js');
require('./attachment-registry.service.js');
require('./attachment-icon.component.js');
require('./attachment-icon.controller.js');
require('./preview/default-preview/default-preview.component.js');
require('./preview/default-preview/default-preview.constant.js');
require('./preview/image-preview/image-preview.component.js');
require('./preview/image-preview/image-preview.constant.js');
require('./preview/image-preview/image-preview.run.js');
require('./viewer/attachment-viewer-gallery.service.js');
require('./viewer/attachment-viewer.directive.js');
require('./viewer/attachment-viewer.service.js');
require('./viewer/default-viewer/default-viewer.constant.js');
require('./viewer/default-viewer/default-viewer.directive.js');
require('./viewer/image-viewer/image-viewer.constant.js');
require('./viewer/image-viewer/image-viewer.directive.js');
require('./viewer/image-viewer/image-viewer.run.js');
require('./viewer/video-viewer/video-viewer.constant.js');
require('./viewer/video-viewer/video-viewer.directive.js');
require('./viewer/video-viewer/video-viewer.run.js');
