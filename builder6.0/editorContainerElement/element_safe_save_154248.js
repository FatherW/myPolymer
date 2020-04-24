var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest, $uibModal, $mdDialog) {
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude: true,
        template: '<div context-menu="menuOptions"></div>',
        controller: function ($scope, $element, $attrs) {

        }
    }
    return editorContainerElement;
});