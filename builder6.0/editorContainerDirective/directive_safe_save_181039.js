var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, elm, attrs) {
            elm.bind('focus', function () {
                console.log('focus');
            })
            elm.bind('blur', function () {
                console.log('blur');
            });
        },
        controller: function ($scope, $element, $attrs) {

        }
    };
    return editorContainer;
});