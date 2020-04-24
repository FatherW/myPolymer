var app = angular.module('demoApp');
app.directive('master', function ($compile) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.masterId = $scope.$eval(attr.master) || $element[0].id;
            $element[0].master = $scope.masterId;
            console.log($scope.masterId);
        }
    };
    return master;
});