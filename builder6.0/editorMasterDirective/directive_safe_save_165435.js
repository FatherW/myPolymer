var app = angular.module('demoApp');
app.directive('master', function ($compile) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            if($attrs){

            }
            console.log($attrs);
            console.log($scope.menuOptions);
        }
    };
    return master;
});