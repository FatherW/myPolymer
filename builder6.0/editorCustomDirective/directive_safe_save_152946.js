var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            console.log('custom directive');
        }
    };
    return master;
});