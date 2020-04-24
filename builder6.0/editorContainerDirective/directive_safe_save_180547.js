var app = angular.module('demoApp');
app.directive('editorContainer', function ($mdDialog) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            var observer = new MutationObserver(function (mutations) {
                console.log('hiiiiii');
            });
            observer.observe(element[0], {
                childList: true,
                subtree: true
            });
        }
    };
    return editorContainer;
});