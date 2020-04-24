var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            element.bind('mouseover', function (e) {
                console.log(element);
            });
        }
    };
    return custom;
});