var app = angular.module('demoApp');
app.directive('master', function ($compile) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.masterId = $scope.$eval($attrs.master) || $attrs.id;
            $element.attr('master', $scope.masterId);
            console.log('2', $scope.model);
        }
    };
    return master;
});