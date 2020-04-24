var app = angular.module('demoApp');
app.directive('master', function ($compile) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.masterId = $scope.$eval($attrs.master) || $attrs.id;
            $element.attr('master', $scope.masterId);
            console.log('change model to master:', $scope.masterId);
            if (!angular.isUndefined($scope.atom[$scope.masterId])) {
                $scope.model = $scope.atom[$scope.masterId];
                console.log('changed');
            } else if ($scope.masterId === $attrs.id) {
                console.log('same id');
            } else {
                console.log('no this master atom');
            }
        }
    };
    return master;
});