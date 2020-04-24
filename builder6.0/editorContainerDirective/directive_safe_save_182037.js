var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<div ng-bind-html="containerHtml | to_trusted"></div>',
        link: function (scope, element, attrs) {
            element.unbind('DOMSubtreeModified').bind('DOMSubtreeModified', function () {
                console.log(scope.containerHtml);
            });
        },
        controller: function ($scope, $element) {
            $scope.containerHtml = $element.html();
        }
    };
    return editorContainer;
});