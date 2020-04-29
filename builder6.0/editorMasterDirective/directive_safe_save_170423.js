var app = angular.module('demoApp');
app.directive('master', function ($compile) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            console.log($attrs.contextMenu);
            console.log($attrs.id);
            console.log($attrs.master);
            console.log($attrs.class);
            $scope.masterId = $scope.$eval($attrs.master) || $element[0].id;
            $element[0].master = $scope.masterId;
            console.log($scope.masterId);
        }
    };
    return master;
});