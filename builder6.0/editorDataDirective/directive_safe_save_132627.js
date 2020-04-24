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
                    if ($scope.menuOptions[i][0] == ("內容管理：" + $scope.table)) {
                        return;
                    }
                    if (i + 1 == $scope.menuOptions.length) {
                        $scope.setDataMenu();
                    }
                }
            });
            $scope.setDataMenu = function () {
                $scope.menuOptions.push(["內容管理：" + $scope.table, function () {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: $scope.table
                        }
                    }).then(function () {
                        console.log('updated');
                    });
                }]);
            }
        }
    };
    return master;
});