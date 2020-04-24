var app = angular.module('demoApp');
app.directive('editorContainer', function ($mdDialog) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.$watch(function () {
                return $element.html();
            }, function(val) {
                //TODO: write code here, slit wrists, etc. etc.
            });
        }
    };
    return editorContainer;
});