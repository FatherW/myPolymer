var app = angular.module('demoApp');
app.directive('data', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            attrs.$observe('data', function (value) {
                scope.table = value;
            });
        },
        controller: function ($scope, $http, $element, $attrs) {
            
        }
    };
    return master;
});