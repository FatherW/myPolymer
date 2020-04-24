var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            element.bind('DOMSubtreeModified', function () {
                console.log('DOMSubtreeModified');
            });
        },
        controller: function ($scope, $element, $attrs) {

        }
    };
    return editorContainer;
});