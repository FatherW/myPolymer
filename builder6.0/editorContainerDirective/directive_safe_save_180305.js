var app = angular.module('demoApp');
app.directive('editorContainer', function ($mdDialog) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.$watch(
                function () {
                    return $element[0].childNodes.length;
                },
                function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        // code goes here
                    }
                }
            );
        }
    };
    return editorContainer;
});