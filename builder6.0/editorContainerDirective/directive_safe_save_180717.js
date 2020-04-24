var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            console.log('hiasdsadffs');
            $scope.$watch(function () {
                return document.body.innerHTML;
            }, function(val) {
                //TODO: write code here, slit wrists, etc. etc.
                console.log('hiasdsadffs');
            });
        }
    };
    return editorContainer;
});