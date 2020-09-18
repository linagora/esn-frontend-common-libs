'use strict';

/* global chai */

const { expect } = chai;
const picture130x130 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/7QBIUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACAAIAOEJJTQQlAAAAAAAQ/OEfici3yXgvNGI0B1h36//hABhFeGlmAABJSSoACAAAAAAAAAAAAAAA/+EDaWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJCN0IyRURCNDMyRDZDN0Y5RUVDOTczNEZCOUYzQzUxRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRDZDQzQ4N0IxMTgxMUUzQjJCRkY2NzMxNjkxMzYwMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRDZDQzQ4NkIxMTgxMUUzQjJCRkY2NzMxNjkxMzYwMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjE5NDcwQkQxNDIwNjgxMUFBMkVGOEJENDQzODA4MTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjEx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';

describe('The Avatar Angular module', function() {
  beforeEach(angular.mock.module('esn.avatar'));

  describe('imgLoaded directive', function() {
    var html = '<img-loaded optimal-size="512"/>';

    beforeEach(angular.mock.inject(['$compile', '$rootScope', 'selectionService', function($c, $r, selectionService) {
      this.$compile = $c;
      this.$rootScope = $r;
      this.selectionService = selectionService;
    }]));

    it('should draw the loaded image in a canvas on crop:loaded event', function(done) {
      var img = { img: 'mock' };

      this.selectionService.image = img;
      var element = this.$compile(html)(this.$rootScope);
      var document = element[0].ownerDocument;
      var create = document.createElement;

      var drawImage = function(image) {
        document.createElement = create;
        expect(image).to.equal(img);
        done();
      };

      document.createElement = function() {
        return {
          getContext: function() {
            return {
              drawImage: drawImage
            };
          }
        };
      };
      this.$rootScope.$broadcast('crop:loaded');
    });

    it('should set image width to optimal size when width greater than height of original image', function(done) {
      var img = { width: 2, height: 1 };

      this.selectionService.image = img;
      var element = this.$compile(html)(this.$rootScope);
      var document = element[0].ownerDocument;
      var create = document.createElement;

      var drawImage = function(img, a, b, width, height) {
        document.createElement = create;
        expect(width).to.equal(512);
        expect(height).to.equal(256);
        done();
      };

      document.createElement = function() {
        return {
          getContext: function() {
            return {
              drawImage: drawImage
            };
          }
        };
      };

      this.$rootScope.$broadcast('crop:loaded');
    });

    it('should set image height to optimal size when height greater than width of original image', function(done) {
      var img = { width: 1, height: 2 };

      this.selectionService.image = img;
      var element = this.$compile(html)(this.$rootScope);
      var document = element[0].ownerDocument;
      var create = document.createElement;

      var drawImage = function(img, a, b, width, height) {
        document.createElement = create;
        expect(width).to.equal(256);
        expect(height).to.equal(512);
        done();
      };

      document.createElement = function() {
        return {
          getContext: function() {
            return {
              drawImage: drawImage
            };
          }
        };
      };

      this.$rootScope.$broadcast('crop:loaded');
    });
  });

  describe('loadButton directive', function() {
    var html = '<input type="file" load-button/>';
    var initDirective;

    beforeEach(angular.mock.inject(['$compile', '$rootScope', 'selectionService', function($c, $r, selectionService) {
      this.$compile = $c;
      this.$rootScope = $r;
      this.selectionService = selectionService;
      this.$scope = this.$rootScope.$new();
    }]));

    beforeEach(function() {
      var self = this;

      initDirective = function() {
        var element = self.$compile(html)(self.$scope);

        self.$scope.$digest();

        return element;
      };
    });

    it('should set an error in the scope if file is not set', function(done) {
      var element = initDirective();

      element.trigger('change');
      expect(this.selectionService.getError()).to.equal('Wrong file type, please select a valid image');
      done();
    });

    it('should set an error in the scope if file size is > 5MB', function(done) {
      var element = initDirective();
      var file = {
        type: 'change',
        dataTransfer: {
          files: [{
            type: 'image/',
            size: Math.pow(2, 24)
          }]
        }
      };

      element.trigger(file);
      expect(this.selectionService.getError()).to.equal('File is too large (maximum size is 5 Mb)');
      done();
    });

    it('should not set an error in the scope if file size is < 5MB', function(done) {
      var element = initDirective();
      const smallFile = new File(['foo'], 'foot.txt', {
        type: 'image/',
        size: Math.pow(2, 10)
      });

      var event = {
        type: 'change',
        dataTransfer: {
          files: [smallFile]
        }
      };

      element.trigger(event);
      expect(this.selectionService.getError()).to.be.null;
      done();
    });
  });

  describe('selectionService service', function() {
    var AVATAR_MIN_SIZE;

    beforeEach(angular.mock.inject(function(selectionService, $rootScope, _AVATAR_MIN_SIZE_PX_) {
      this.selectionService = selectionService;
      AVATAR_MIN_SIZE = _AVATAR_MIN_SIZE_PX_;
      this.$rootScope = $rootScope;
    }));

    it('should fire an event to crop:loaded topic when setting an image', function(done) {
      var image = 'foo.png';

      this.$rootScope.$broadcast = function(topic) {
        expect(topic).to.equal('crop:loaded');
        done();
      };
      this.selectionService.setImage(image);
    });

    it('should broadcast x to crop:selected topic when calling broadcastSelection(x)', function(done) {
      var selection = { x: 0, y: 1 };

      this.$rootScope.$broadcast = function(topic, data) {
        expect(topic).to.equal('crop:selected');
        expect(data).to.equal(selection);
        done();
      };
      this.selectionService.broadcastSelection(selection);
    });

    it('should save the input image', function(done) {
      var input = 'foo.png';

      this.selectionService.setImage(input);
      expect(this.selectionService.image).to.equal(input);
      done();
    });

    it('should save the error', function(done) {
      var error = 'fail';

      this.selectionService.setError(error);
      expect(this.selectionService.error).to.equal(error);
      done();
    });

    it('should broadcast the error to crop:error topic when calling setError(err)', function(done) {
      var error = 'fail';

      this.$rootScope.$broadcast = function(topic, data) {
        expect(topic).to.equal('crop:error');
        expect(data).to.equal(error);
        done();
      };
      this.selectionService.setError(error);
    });

    it('should return the stored image when calling getImage', function(done) {
      var input = 'foo.png';

      this.selectionService.image = input;
      var image = this.selectionService.getImage();

      expect(image).to.equal(input);
      done();
    });

    it('should return 130x130 for tested picture', function(done) {
      var originalImage = new Image();

      originalImage.src = picture130x130;
      originalImage.onload = function() {
        expect(originalImage.width).to.equal(130);
        expect(originalImage.height).to.equal(130);
        done();
      };
      this.selectionService.setImage(originalImage);
      this.$rootScope.$digest();
    });

    it('should return AVATAR_MIN_SIZE * AVATAR_MIN_SIZE image when calling getBlob and no selection', function(done) {
      this.selectionService.broadcastSelection({ cords: { w: 0, h: 0 } });
      var originalImage = new Image();

      originalImage.src = picture130x130;
      this.selectionService.setImage(originalImage);
      this.selectionService.getBlob('image/png', function(blob) {

        var reader = new FileReader();

        reader.onload = function(e) {
          var img = new Image();

          img.src = e.target.result;
          img.onload = function() {
            expect(img.width).to.equal(AVATAR_MIN_SIZE);
            expect(img.height).to.equal(AVATAR_MIN_SIZE);
            done();
          };
        };
        reader.readAsDataURL(blob);
      });
    });

    it('should return AVATAR_MIN_SIZE * AVATAR_MIN_SIZE image when calling getBlob and selection', function(done) {
      this.selectionService.broadcastSelection({ cords: { w: 1, h: 1 } });
      var originalImage = new Image();

      originalImage.src = picture130x130;
      this.selectionService.setImage(originalImage);
      this.selectionService.getBlob('image/png', function(blob) {

        var reader = new FileReader();

        reader.onload = function(e) {
          var img = new Image();

          img.src = e.target.result;
          img.onload = function() {
            expect(img.width).to.equal(AVATAR_MIN_SIZE);
            expect(img.height).to.equal(AVATAR_MIN_SIZE);
            done();
          };
        };
        reader.readAsDataURL(blob);
      });
    });
  });

  describe('The avatarEdit controller', function() {
    var userId = '123';
    var domainId = '456';

    beforeEach(function() {
      angular.mock.module('esn.avatar');

      angular.mock.inject(function(
        session,
        selectionService,
        avatarAPI,
        $rootScope,
        $controller
      ) {
        this.session = session;
        this.selectionService = selectionService;
        this.$rootScope = $rootScope;
        this.avatarAPI = avatarAPI;
        this.scope = $rootScope.$new();

        $controller('avatarEdit', {
          $rootScope: this.$rootScope,
          $scope: this.scope,
          session: this.session,
          selectionService: this.selectionService,
          avatarAPI: this.avatarAPI
        });
      });
    });

    describe('The send function', function() {
      it('should call the avatarAPI.uploadAvatar to upload avatar for current user', function(done) {
        this.session.user = { _id: userId };
        this.scope.user = { _id: userId };
        var blob = 'foo';
        var mime = 'bar';

        this.avatarAPI.uploadAvatar = function(_blob, _mime) {
          expect(_blob).to.equal(blob);
          expect(_mime).to.equal(mime);
          done();
        };

        this.scope.send(blob, mime);
        done(new Error('Should not be called'));
      });

      it('should call the avatarAPI.uploadUserAvatar to upload avatar for a specific user', function(done) {
        var specificUserId = '456';
        var blob = 'foo';
        var mime = 'bar';

        this.session.user = { _id: userId };
        this.session.domain = { _id: domainId };
        this.scope.user = { _id: specificUserId };
        this.avatarAPI.uploadUserAvatar = function(_blob, _mime, _userId, _domainId) {
          expect(_blob).to.equal(blob);
          expect(_mime).to.equal(mime);
          expect(_userId).to.equal(specificUserId);
          expect(_domainId).to.equal(domainId);
          done();
        };

        this.scope.send(blob, mime);
        done(new Error('Should not be called'));
      });
    });
  });

  describe('avatarAPI service', function() {
    beforeEach(angular.mock.inject(function(selectionService, $rootScope, $httpBackend, avatarAPI) {
      this.selectionService = selectionService;
      this.$rootScope = $rootScope;
      this.avatarAPI = avatarAPI;
      this.$httpBackend = $httpBackend;
    }));

    describe('The uploadAvatar function', function() {
      it('should send POST to /api/user/profile/avatar with valid mime, parameters and blob', function() {
        var blob = '123';
        var mime = 'image/png';

        this.$httpBackend.expectPOST('/api/user/profile/avatar?mimetype=image%2Fpng', blob).respond(200);
        this.avatarAPI.uploadAvatar(blob, mime);
        this.$httpBackend.flush();
      });

      it('should return a promise', function() {
        var promise = this.avatarAPI.uploadAvatar('foo', 'bar');

        expect(promise.then).to.be.a.function;
      });
    });

    describe('The uploadUserAvatar function', function() {
      it('should PUT to right endpoint to upload avatar for a specific user', function() {
        var blob = 'foobar';
        var mime = 'image/png';
        var userId = '123';
        var domainId = '456';

        this.$httpBackend.expectPUT('/api/users/' + userId + '/profile/avatar?domain_id=' + domainId + '&mimetype=image%2Fpng', blob).respond(200);
        this.avatarAPI.uploadUserAvatar(blob, mime, userId, domainId);
        this.$httpBackend.flush();
      });

      it('should return a promise', function() {
        var promise = this.avatarAPI.uploadUserAvatar('foo', 'bar', '123', '456');

        expect(promise.then).to.be.a.function;
      });
    });
  });
});
