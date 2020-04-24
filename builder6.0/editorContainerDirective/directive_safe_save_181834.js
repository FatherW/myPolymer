var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template:'<div ',
        link: function (scope, element, attrs) {
            $scope.containerHtml = element.html();
            element.unbind('DOMSubtreeModified').bind('DOMSubtreeModified', function () {
                console.log('DOMSubtreeModified');
            });
        }
    };
    return editorContainer;
});