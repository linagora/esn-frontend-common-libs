(function(angular) {
  'use strict';

  angular.module('esn.avatar', [
    'esn.constants',
    'mgcrea.ngStrap',
    'ngAnimate',
    'mgcrea.ngStrap.modal',
    'angularFileUpload',
    'mgcrea.ngStrap.alert',
    'ng.deviceDetector',
    'esn.http',
    'esn.url',
    'esn.session'
  ])
    .constant('AVATAR_OFFSET', 10)
    .constant('DEFAULT_AVATAR_SIZE', 256)
    .constant('FONT_RATIO', 66)
    .constant('DEFAULT_TEXT_COLOR', 'white')
    .constant('BACKGROUND_COLORS', ['#d32f2f', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C', '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#5D4037', '#616161', '#455A64'])
    .provider('avatarDefaultUrl', function() {
      var url = '/images/community.png';

      return {
        set: function(value) {
          url = value || '/images/community.png';
        },
        $get: function() {
          return {
            get: function() {
              return url;
            }
          };
        }
      };
    })
    .provider('jcropExtendOptions', function() {
      var options = {};

      return {
        set: function(value) {
          options = value || {};
        },
        $get: function() {
          return {
            get: function() {
              return options;
            }
          };
        }
      };
    })
    .controller('avatarEdit', function($rootScope, $scope, session, selectionService, avatarAPI, $alert, $modal) {

      selectionService.clear();
      var createModal = $modal({
        scope: $scope, template: require('../../views/modules/avatar/avatar-edit-modal.pug'), show: false, backdrop: 'static', keyboard: false
      });
      var alertInstance;

      function destroyAlertInstance() {
        if (alertInstance) {
          alertInstance.destroy();
          alertInstance = null;
        }
      }

      $scope.showAvatarEditModal = function() {
        $scope.initUploadContext();
        createModal.$promise.then(createModal.show);
      };

      $scope.initUploadContext = function() {
        $scope.uploadError = false;
        $scope.progress = 0;
        $scope.status = 'Upload';
        $scope.uploading = false;
        $scope.step = 'none';
        $scope.preview = false;
      };

      $scope.preview = false;

      function done() {
        $scope.uploading = false;
        if (createModal) {
          createModal.hide();
        }
        selectionService.clear();
      }

      $scope.send = function(blob, mime) {
        $scope.uploading = true;
        $scope.step = 'uploading';

        var uploadAvatar = $scope.user._id === session.user._id ?
          avatarAPI.uploadAvatar(blob, mime) :
          avatarAPI.uploadUserAvatar(blob, mime, $scope.user._id, session.domain._id);

        uploadAvatar
          .progress(function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
          })
          .success(function() {
            $scope.progress = 100;
            $scope.step = 'redirect';
            $rootScope.$broadcast('avatar:updated', $scope.user);
            done();
          })
          .error(function(error) {
            $scope.progress = 100;
            $scope.step = 'uploadfailed';
            $scope.error = error;
            done();
          });
      };

      $scope.upload = function() {

        $scope.uploading = true;
        $scope.status = 'Uploading';
        $scope.progress = 1;
        var mime = 'image/png';

        selectionService.getBlob(mime, function(blob) {
          $scope.send(blob, mime);
        });
      };

      $scope.$on('crop:loaded', function() {
        destroyAlertInstance();
        $scope.initUploadContext();
        $scope.preview = true;
        $scope.$apply();
      });

      $scope.$on('crop:error', function(context, error) {
        destroyAlertInstance();
        if (error) {
          alertInstance = $alert({
            title: 'Error',
            content: error,
            type: 'danger',
            show: true,
            position: 'bottom',
            container: '#edit-avatar-dialog .error',
            animation: 'am-fade'
          });
        }
      });

      $scope.$on('crop:reset', function() {
        destroyAlertInstance();
        selectionService.clear();
      });

      $scope.initUploadContext();

    })
    .factory('avatarAPI', function($upload, httpConfigurer) {
      return {
        uploadAvatar: uploadAvatar,
        uploadUserAvatar: uploadUserAvatar
      };

      function uploadAvatar(blob, mime) {
        return $upload.http({
          method: 'POST',
          url: httpConfigurer.getUrl('/api/user/profile/avatar'),
          headers: { ...httpConfigurer.getHeaders(), 'Content-Type': mime },
          data: blob,
          params: { mimetype: mime, size: blob.size },
          withCredentials: true
        });
      }

      function uploadUserAvatar(blob, mime, userId, domainId) {
        return $upload.http({
          method: 'PUT',
          url: httpConfigurer.getUrl('/api/users/' + userId + '/profile/avatar?domain_id=' + domainId),
          headers: { ...httpConfigurer.getHeaders(), 'Content-Type': mime },
          data: blob,
          params: { mimetype: mime, size: blob.size },
          withCredentials: true
        });
      }
    })
    .factory('selectionService', function($rootScope, AVATAR_MIN_SIZE_PX) {

      var sharedService = {};

      sharedService.image = null;
      sharedService.selection = {};
      sharedService.error = null;

      sharedService.setImage = function(image) {
        this.image = image;
        $rootScope.$broadcast('crop:loaded');
      };

      sharedService.getImage = function() {
        return this.image;
      };

      sharedService.getError = function() {
        return this.error;
      };

      sharedService.setError = function(error) {
        this.error = error;
        $rootScope.$broadcast('crop:error', error);
      };

      sharedService.reset = function() {
        $rootScope.$broadcast('crop:reset');
      };

      sharedService.broadcastSelection = function(x) {
        this.selection = x;
        $rootScope.$broadcast('crop:selected', x);
      };

      sharedService.computeCanvasSelection = function computeCanvasSelection(img, ratio, selection) {
        var w = selection.w * ratio;

        if (w > img.naturalWidth) {
          w = img.naturalWidth;
        }
        var h = selection.h * ratio;

        if (h > img.naturalHeight) {
          h = img.naturalHeight;
        }

        return {
          x: selection.x * ratio,
          y: selection.y * ratio,
          w: w,
          h: h
        };
      };

      sharedService.getBlob = function getBlob(mime, callback) {
        var canvas = document.createElement('canvas');

        canvas.width = AVATAR_MIN_SIZE_PX;
        canvas.height = AVATAR_MIN_SIZE_PX;

        var context = canvas.getContext('2d');
        var image = sharedService.getImage();
        var ratio = sharedService.selection.ratio || 1;
        var selection = sharedService.selection.cords;

        if (selection.w === 0 || selection.h === 0) {
          context.drawImage(image, 0, 0, AVATAR_MIN_SIZE_PX, AVATAR_MIN_SIZE_PX);
        } else {
          var canvasSelection = sharedService.computeCanvasSelection(image, ratio, selection);

          context.drawImage(image, canvasSelection.x, canvasSelection.y, canvasSelection.w, canvasSelection.h, 0, 0, canvas.width, canvas.height);
        }
        canvas.toBlob(callback, mime);
      };

      sharedService.clear = function() {
        sharedService.image = null;
        sharedService.selection = {};
        sharedService.error = null;
      };

      return sharedService;

    })
    .directive('imgPreview', function(selectionService, AVATAR_MIN_SIZE_PX) {

      return {
        restrict: 'A',
        replace: true,
        link: function($scope, element) {
          var canvas = element[0];

          canvas.width = AVATAR_MIN_SIZE_PX / 2;
          canvas.height = canvas.width;
          var ctx = canvas.getContext('2d');

          $scope.$on('crop:reset', function() {
          // eslint-disable-next-line no-self-assign
            canvas.width = canvas.width;
          });
          $scope.$on('crop:selected', function(context, data) {
            var selection = data.cords;
            var ratio = data.ratio || 1;
            var img = selectionService.getImage();

            // eslint-disable-next-line no-self-assign
            canvas.width = canvas.width;
            if (Math.round(selection.w * ratio) < AVATAR_MIN_SIZE_PX || Math.round(selection.h * ratio) < AVATAR_MIN_SIZE_PX) {
              ctx.drawImage(img, 0, 0, AVATAR_MIN_SIZE_PX, AVATAR_MIN_SIZE_PX);
            } else {
              var canvasSelection = selectionService.computeCanvasSelection(img, ratio, selection);

              ctx.drawImage(img, canvasSelection.x, canvasSelection.y, canvasSelection.w, canvasSelection.h, 0, 0, canvas.width, canvas.height);
            }
          });
        }
      };
    })
    .directive('imgLoaded', function(selectionService, AVATAR_MIN_SIZE_PX, AVATAR_OFFSET, deviceDetector, jcropExtendOptions) {
      return {
        restrict: 'E',
        scope: {
          optimalSize: '='
        },
        link: function(scope, element) {
          var myImg, myJcropAPI;
          var clear = function() {
            if (myJcropAPI) {
              myJcropAPI.destroy();
              myJcropAPI = null;
            }
            if (myImg) {
              myImg.next().remove();
              myImg.remove();
              myImg = undefined;
            }
          };

          scope.$on('crop:reset', clear);
          scope.$on('crop:loaded', function() {
            clear();
            var image = selectionService.getImage();
            var canvas = document.createElement('canvas');

            var width, height, ratio;

            if (image.width >= image.height) {
              width = scope.optimalSize;
              ratio = image.width / width;
              height = image.height / ratio;
            } else {
              height = scope.optimalSize;
              ratio = image.height / height;
              width = image.width / ratio;
            }

            var minsize = AVATAR_MIN_SIZE_PX / ratio;
            var minSetSelectSizeX = width - AVATAR_OFFSET;
            var minSetSelectSizeY = height - AVATAR_OFFSET;

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext('2d');

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            element.after('<img />');
            myImg = element.next();
            myImg.attr('src', canvas.toDataURL());
            myImg.attr('width', width);
            myImg.attr('height', height);

            var broadcastSelection = function(x) {
              selectionService.broadcastSelection({ cords: x, ratio: ratio });
            };

            angular.element(myImg).Jcrop(angular.extend({}, {
              bgColor: 'black',
              bgOpacity: 0.6,
              setSelect: [AVATAR_OFFSET, AVATAR_OFFSET, minSetSelectSizeX, minSetSelectSizeY],
              minSize: [minsize, minsize],
              aspectRatio: 1,
              touchSupport: true,
              onSelect: broadcastSelection,
              onChange: deviceDetector.isDesktop() ? broadcastSelection : function() {}
            }, jcropExtendOptions.get()), function() {
              myJcropAPI = this;
            });

          });
          scope.$on('$destroy', clear);
        }
      };
    })
    .directive('loadButton', function(selectionService, AVATAR_MIN_SIZE_PX, AVATAR_MAX_SIZE_MB) {

      return {
        restrict: 'A',
        replace: true,
        link: function(scope, element) {
          element.bind('change', function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            selectionService.reset();
            selectionService.clear();
            var file = evt.dataTransfer !== undefined ? evt.dataTransfer.files[0] : evt.target.files[0];

            if (!file || !file.type.match(/^image\//)) {
              selectionService.setError('Wrong file type, please select a valid image');
            } else {
              var megabyte = Math.pow(2, 20);

              if (file.size > AVATAR_MAX_SIZE_MB * megabyte) {
                selectionService.setError('File is too large (maximum size is ' + AVATAR_MAX_SIZE_MB + ' Mb)');
              } else {
                var reader = new FileReader();

                reader.onload = (function() {
                  return function(e) {
                    var image = new Image();

                    image.src = e.target.result;
                    image.onload = function() {
                      var imgHeight = image.naturalHeight,
                        imgWidth = image.naturalWidth;

                      if (imgHeight < AVATAR_MIN_SIZE_PX || imgWidth < AVATAR_MIN_SIZE_PX) {
                        selectionService.setError('This image is too small, please select a picture with a minimum size of ' +
                                                AVATAR_MIN_SIZE_PX + 'x' + AVATAR_MIN_SIZE_PX + 'px');
                      } else {
                        selectionService.setError();
                        selectionService.setImage(image);
                      }
                    };
                  };
                })(file);
                reader.readAsDataURL(file);
              }
            }
          });
        }
      };
    })
    .directive('avatarPicker', function(selectionService, $alert, avatarDefaultUrl, httpConfigurer) {
      function link($scope, element, attrs) {
        $scope.image = {
          selected: false
        };
        $scope.avatarPlaceholder = attrs.avatarPlaceholder ? httpConfigurer.getUrl(attrs.avatarPlaceholder) : avatarDefaultUrl.get();
        var alertInstance = null;

        function destroyAlertInstance() {
          if (alertInstance) {
            alertInstance.destroy();
            alertInstance = null;
          }
        }

        $scope.removeSelectedImage = function() {
          selectionService.clear();
          $scope.image.selected = false;
        };

        $scope.$on('crop:loaded', function() {
          destroyAlertInstance();
          $scope.image.selected = true;
          $scope.$apply();
        });

        $scope.$on('crop:error', function(context, error) {
          if (error) {
            alertInstance = $alert({
              title: '',
              content: error,
              type: 'danger',
              show: true,
              position: 'bottom',
              container: element.find('.avatar-picker-error'),
              animation: 'am-fade'
            });
          }
        });

      }

      return {
        scope: {},
        restrict: 'E',
        template: require('../../views/modules/avatar/avatar-picker.pug'),
        link: link
      };
    })
    .directive('avatarImg', function($timeout) {
      function link(scope) {
        scope.getURL = function() {
          if (scope.avatarUser) {
            return '/api/users/' + scope.avatarUser._id + '/profile/avatar?cb=' + Date.now();
          }

          return '/api/user/profile/avatar?cb=' + Date.now();
        };

        scope.avatarURL = scope.getURL();
        scope.$on('avatar:updated', function() {
          $timeout(function() {
            scope.avatarURL = scope.getURL();
          });
        });
      }

      return {
        restrict: 'E',
        replace: true,
        scope: {
          avatarUser: '=?'
        },
        template: '<img ng-src="{{avatarURL}}" />',
        link: link
      };
    })
    .component('esnAvatar', {
      template: require('../../views/modules/avatar/avatar.pug'),
      controller: 'EsnAvatarController',
      bindings: {
        userId: '<',
        userEmail: '<',
        avatarUrl: '<',
        hideUserStatus: '<',
        noCache: '<',
        resolveAvatar: '&',
        objectType: '<'
      }
    })
    .controller('EsnAvatarController', function($attrs, $q, $log, $scope, userAPI, esnAvatarUrlService) {
      var self = this;

      self.$onInit = setProperties;
      self.$onChanges = setProperties;
      self.displayUserStatus = displayUserStatus;
      self.avatar = {};

      function setProperties() {
        if ($attrs.resolveAvatar) {
          return self.resolveAvatar().then(function(avatar) {
            self.avatar = avatar;
            // trigger a DOM update after resolving the avatar url
            $scope.$evalAsync();
          });
        }

        self.avatar = {};

        if (self.userId) {
          self.avatar.id = self.userId;
        }

        if (self.userEmail) {
          self.avatar.email = self.userEmail;
        }

        self.avatar.url = self.avatarUrl || generateAvatarUrl(self.avatar.id, self.avatar.email);

        if (self.userEmail && !self.avatar.id) {
          getUserIdByEmail(self.userEmail).then(function(userId) {
            self.avatar.id = userId;
          });
        }
      }

      function generateAvatarUrl(id, email) {
        if (id) {
          return esnAvatarUrlService.generateUrlByUserId(id, self.noCache);
        }

        if (email) {
          return esnAvatarUrlService.generateUrl(email, self.noCache);
        }
      }

      function getUserIdByEmail(userEmail) {
        return userAPI.getUsersByEmail(userEmail)
          .then(function(response) {
            if (response.data && response.data[0]) {
              return response.data[0]._id;
            }
          });
      }

      function displayUserStatus() {
        return self.objectType === 'user' ? !!self.avatar.id && !self.hideUserStatus : false;
      }
    })
    .factory('EsnInitialsAvatarGeneratorService', function(DEFAULT_AVATAR_SIZE, DEFAULT_TEXT_COLOR, FONT_RATIO, BACKGROUND_COLORS) {
      let canvas = null;

      return {
        generate
      };

      /**
       * generate an avatar from username or email
       *
       * @param {String} username - the username or email
       * @returns {String} - the generated avatar string
       */
      function generate(username) {
        const text = generateInitials(username);
        const color = generateColor(username);

        return drawAvatar(text, color);
      }

      /**
       * generate initials from username or email
       *
       * @param {String} name - the username or email
       * @returns {String} - the initials
       */
      function generateInitials(name) {
        const initials = name.split(' ').map(c => c[0].toUpperCase());

        return initials.join('');
      }

      /**
       * generate color from username or email
       *
       * @param {String} name - the username or email
       * @returns {String} - the color
       */
      function generateColor(seed) {
        let hash = 0;

        seed.split('').forEach(c => {
          // eslint-disable-next-line no-bitwise
          hash = ((hash << 5) - hash) + c.charCodeAt(0);
        });

        // eslint-disable-next-line no-bitwise
        const uuid = (hash & 0x00FFFFFF).toString(16);
        const sum = uuid
          .slice(-3)
          .split('')
          .reduce((acc, value) => acc + value.charCodeAt(), 0);

        return BACKGROUND_COLORS[sum % BACKGROUND_COLORS.length];
      }

      /**
       * generates a base64 string canvas element with the given text and color
       *
       * @param {String} text - the text to draw
       * @param {String} color - the background color
       * @returns {String} - the generated canvas element
       */
      function drawAvatar(text, color) {
        if (!canvas) {
          canvas = document.createElement('canvas');
        }
        const context = canvas.getContext('2d');
        const avatarSize = DEFAULT_AVATAR_SIZE;
        let fontSize = 1;

        canvas.width = avatarSize;
        canvas.height = avatarSize;

        context.fillStyle = color;
        context.beginPath();
        context.ellipse(
          canvas.width / 2, canvas.height / 2,
          canvas.width / 2, canvas.height / 2,
          0,
          0, Math.PI * 2
        );
        context.fill();

        if (text.length === 1) {
          // use precalculated font ratio to improve perfomance
          fontSize = avatarSize * FONT_RATIO / 100;
        } else if (text.length > 1) {
          fontSize = calculateFitFontSize(context, avatarSize, text);
        }

        context.font = fontName(fontSize);
        context.fillStyle = DEFAULT_TEXT_COLOR;
        context.textBaseline = 'middle';
        const textWidth = context.measureText(text).width;

        context.fillText(text, (avatarSize / 2) - (textWidth / 2), avatarSize / 2);

        return canvas.toDataURL();
      }

      /**
       * calculate the font size that fits the text in the canvas
       *
       * @param {CanvasRenderingContext2D} canvasContext - the canvas context
       * @param {Number} canvasSize - the canvas size
       * @param {String} text - the text to draw
       * @returns {Number} - the font size
       */
      function calculateFitFontSize(canvasContext, canvasSize, text) {
        let fontSize = 0;
        let textMetric, textWidth, textHeight;

        do {
          fontSize++;
          canvasContext.font = fontName(fontSize);
          textMetric = canvasContext.measureText(text);
          textWidth = textMetric.width;
          textHeight = textMetric.emHeightAscent + textMetric.emHeightDescent;
        } while (textWidth < canvasSize && textHeight < canvasSize);

        return fontSize;
      }

      /**
       * calculate the font name for the given font size
       *
       * @param {Number} fontSize - the font size
       * @returns {String} - the font name
       */
      function fontName(size) {
        return `${size}px Arial`;
      }
    });
})(angular);

require('./avatar/avatar-url.service.js');

require('../constants.js');
require('./http.js');
require('./url.js');
require('./session.js');
