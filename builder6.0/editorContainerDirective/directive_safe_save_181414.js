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
            scope.$watch(function () {
                return element.html();
            }, function () {
                console.log('hi');
            })
            scope.$watch(element.html(), function (value) {
                console.log('hi');
            });
        }
    };
    return editorContainer;
});