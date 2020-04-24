var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            element.bind('mouseover', function (event) {
                event.stopPropagation();
                console.log(event.currentTarget);
            });
        }
    };
    return custom;
});