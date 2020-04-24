var app = angular.module('demoApp');
app.directive('editorContainer', function ($mdDialog) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function ($scope, $el, $attrs) {
            $scope.$watch(
                function () {
                    return $el[0].childNodes.length;
                },
                function (newValue, oldValue) {
                    console.log('changed');
                }
            );
        }
    };
    return editorContainer;
});