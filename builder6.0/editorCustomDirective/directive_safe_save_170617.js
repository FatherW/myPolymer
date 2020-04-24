var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element) {
            console.log('Custom Directive');
            console.log($scope);
            console.log($element);
        }
    };
    return custom;
});