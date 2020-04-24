var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function (scope, element) {
            element.append('<button>XXXXXXXX</button>');
            $compile(element)(scope);
        }
    };
    return custom;
});