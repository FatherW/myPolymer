var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $uibModal) {
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "directives/editorBody/directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            $scope.loadLess('directives/editorBody/directive.less');
        }
    };
    return editorHtmlDirective;
});