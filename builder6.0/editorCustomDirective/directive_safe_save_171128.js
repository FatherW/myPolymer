var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element) {
            $element.append("<button>Remove</button>");
            console.log('hi2');
        }
    };
    return custom;
});