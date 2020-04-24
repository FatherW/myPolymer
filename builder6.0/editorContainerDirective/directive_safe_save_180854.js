var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        linkg:
        controller: function ($scope, $element, $attrs) {

        }
    };
    return editorContainer;
});