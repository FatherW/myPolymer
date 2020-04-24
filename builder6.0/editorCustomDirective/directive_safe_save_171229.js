var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element) {
            setTimeout(function () {
                $element.append("<button>Remove</button>");
            }, 100);
        }
    };
    return custom;
});