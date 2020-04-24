var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $uibModal) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + "directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            $scope.loadLess(path + "directive.css');
        }
    };
    return editorHtmlDirective;
});