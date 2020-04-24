var app = angular.module('demoApp');
app.directive('data', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $attrs.$observe('data', function (value) {
                $scope.table = value;
                setTimeout(function () {
                    console.log(value)
                }, 1000);
            });
            $scope.setDataMenu = function () {
                console.log($scope.table);
                $scope.menuOptions.push([$scope.table, function () {
                    console.log($scope.table);
                }]);
            }
            for (var i = 0; i < $scope.menuOptions.length; i++) {
                if ($scope.menuOptions[i][0] == $scope.table) {
                    return;
                }
                if (i + 1 == $scope.menuOptions.length) {
                    $scope.setDataMenu();
                }
            }
        }
    };
    return master;
});