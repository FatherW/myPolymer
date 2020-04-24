var app = angular.module('demoApp');
app.directive('master', function () {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.atom[$scope.model.masterId])) {
                $scope.model.masterId = $attrs.id;
            } else {
                console.log('master atom:', $scope.atom[$scope.model.masterId]);
            }

            /*if ($scope.masterId === $attrs.id) {
             console.log('same id');
             } else if (!angular.isUndefined($scope.atom[$scope.masterId])) {
             $scope.model = $scope.atom[$scope.masterId];
             console.log('changed');
             } else {
             console.log('null id');
             }*/

            for (var i = 0; i < $scope.menuOptions.length; i++) {
                if ($scope.menuOptions[i][0] == 'Master') {
                    return;
                }
                if (i + 1 == $scope.menuOptions.length) {
                    $scope.menuOptions.push(["Master", function () {
                        $scope.model.masterId = 'ele1489393393207';
                        $scope.compile();
                    }]);
                }
            }
        }
    };
    return master;
});