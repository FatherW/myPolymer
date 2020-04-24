var app = angular.module('demoApp');
app.directive('editor', function ($mdDialog) {
    var editor = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            console.log($element);
        }
    };
    return editor;
});