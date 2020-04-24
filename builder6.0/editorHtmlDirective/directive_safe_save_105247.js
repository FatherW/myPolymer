var app = angular.module('demoApp');
app.directive('editorBody', function ($compile, $uibModal) {
    var editorBody = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "directives/editorBody/directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            $scope.loadLess('directives/editorBody/directive.less');
        }
    };
    return editorBody;
});