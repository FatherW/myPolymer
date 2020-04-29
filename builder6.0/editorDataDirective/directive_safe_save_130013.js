var app = angular.module('demoApp');
app.directive('data', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (attrs) {
            attrs.$observe('data', function (value) {
                console.log('data=', value);
            });
        }
        controller: function ($scope, $http, $element, $attrs) {
            
        }
    };
    return master;
});