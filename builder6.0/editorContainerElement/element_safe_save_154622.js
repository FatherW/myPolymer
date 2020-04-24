var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest, $uibModal, $mdDialog) {
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude: true,
        template: '<div context-menu="menuOptions" ng-transclude></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["Container", function () {
                    console.log('menu');
                }]
            ];
        }
    }
    return editorContainerElement;
});