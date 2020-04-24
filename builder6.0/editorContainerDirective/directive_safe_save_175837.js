var app = angular.module('demoApp');
app.directive('editorContainer', function ($mdDialog) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.containerBindHtml = $element.html();
        }
    };
    return editorContainer;
});