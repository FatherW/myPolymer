var app = angular.module('demoApp');
app.directive('data', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $attrs.$observe('data', function (value) {
                $scope.table = value;
                for (var i = 0; i < $scope.menuOptions.length; i++) {
                    if ($scope.menuOptions[i][0] == "內容管理") {
                        return;
                    }
                    if (i + 1 == $scope.menuOptions.length) {
                        $scope.setDataMenu();
                    }
                }
            });
            $scope.setDataMenu = function () {
                $scope.menuOptions.push(["內容管理", function () {
                    $mdDialog.show({
                        controller: 'dataPopupController',
                        templateUrl: 'models/dataPopup/popup.html' + "?id=" + new Date().getTime(),
                        clickOutsideToClose: false,
                        locals: {
                            rootScope: $scope,
                            table: $scope.table
                        }
                    });
                }]);
            }
        }
    };
    return master;
});