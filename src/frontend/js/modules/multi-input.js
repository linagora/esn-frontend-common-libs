(function(angular) {
  'use strict';

  angular.module('esn.multi-input', [])

    .factory('multiInputService', function($timeout) {
      var focusLastItem = function(element, className) {
        $timeout(function() {
          element.find(className).last().focus();
        }, 0, false);
      };

      return {
        focusLastItem: focusLastItem
      };
    })

    .controller('MultiInputGroupController', function($scope, $timeout, multiInputService) {
      $scope.showDeleteButtonArray = [];
      $scope.showAddButton = [];
      $scope.content = $scope.inputValue && $scope.inputValue.length ? angular.copy($scope.inputValue) : [{}];
      $scope.inputValue = $scope.inputValue ? $scope.inputValue : [];

      $scope.showAddButton[$scope.content.length - 1] = true;
      $scope.showDeleteButtonArray[$scope.content.length - 1] = false;

      $scope.onFocusFn = function(id) {
        if ($scope.content.length === 1) {
          $scope.showAddButton[id] = true;
          $scope.showDeleteButtonArray[id] = false;
        } else {
          $scope.showAddButton[$scope.content.length - 1] = false;
          $scope.showAddButton[$scope.content.length - 2] = true;

          $scope.showDeleteButtonArray[$scope.content.length - 1] = true;
        }
      };

      function hasValueInput(content) {
        return content.value || content.street || content.zip || content.city || content.country;
      }

      $scope.verifyNew = function(id) {
        $scope.onFocusFn(id);

        if (hasValueInput($scope.content[id])) {
          $scope.inputValue[id] = $scope.content[id];
        } else {
          $scope.inputValue.splice(id, 1);
        }
      };

      this.addField = function(element) {
        $scope.showAddButton[$scope.content.length - 2] = false;
        $scope.showDeleteButtonArray[$scope.content.length - 1] = false;

        $scope.content.push({
          value: '',
          type: $scope.types ? $scope.types[$scope.content.length % $scope.types.length] : ''
        });
        multiInputService.focusLastItem(element, '.multi-input-content .multi-input-text');
      };

      this.deleteField = function(element, id) {
        $scope.content.splice(id, 1);
        if ($scope.inputValue && $scope.inputValue[id]) {
          $scope.inputValue.splice(id, 1);
        }
        if ($scope.content.length === 0) {
          $scope.content = [{ type: $scope.types ? $scope.types[0] : '' }];
        }
        multiInputService.focusLastItem(element, '.multi-input-content .multi-input-text');
      };

      $scope.isMultiTypeField = function() {
        return !!($scope.types && $scope.types.length > 0);
      };

      $scope.onTypeChange = function(id) {
        $scope.onFocusFn(id);

        if ($scope.inputValue[id]) {
          $scope.inputValue[id].type = $scope.content[id].type;
        }
      };
    })

    .directive('multiInputGroup', function() {
      return {
        restrict: 'E',
        scope: {
          inputValue: '=multiInputModel',
          types: '=multiInputTypes',
          inputType: '@multiInputTexttype',
          placeholder: '@multiInputPlaceholder',
          autocapitalize: '@multiInputAutocapitalize'
        },
        template: require('../../views/modules/multi-input/multi-input-group.pug'),
        controller: 'MultiInputGroupController',
        link: function(scope, element, attrs, controller) {
          scope.addField = controller.addField.bind(null, element);
          scope.deleteField = controller.deleteField.bind(null, element);
        }
      };
    })

    .directive('multiInputGroupAddress', function() {
      return {
        restrict: 'E',
        scope: {
          inputValue: '=multiInputModel',
          types: '=multiInputTypes',
          inputType: '@multiInputTexttype',
          placeholder: '@multiInputPlaceholder'
        },
        template: require('../../views/modules/multi-input/multi-input-group-address.pug'),
        controller: 'MultiInputGroupController',
        link: function(scope, element, attrs, controller) {
          scope.addField = controller.addField.bind(null, element);
          scope.deleteField = controller.deleteField.bind(null, element);
        }
      };
    });

})(angular);
