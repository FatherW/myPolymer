var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.atom[$scope.model.masterId])) {
                $scope.model.masterId = $attrs.id;
            } else {
                console.log('master atom:', $scope.atom[$scope.model.masterId]);
                $scope.model = $scope.atom[$scope.model.masterId];
            }
            $scope.setMasterMenu = function () {
                $scope.menuOptions.push(["模版儲存", function () {
                    $mdDialog.show({
                        templateUrl: 'models/masterPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'masterPopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: $scope
                        }
                    });
                }], ["模版選擇", function () {
                    $scope.model.masterId = 'ele1489393393207';
                    $scope.compile();
                }]);
            }
            for (var i = 0; i < $scope.menuOptions.length; i++) {
                if ($scope.menuOptions[i][0] == '模版選擇' || $scope.menuOptions[i][0] == '模版儲存') {
                    return;
                }
                if (i + 1 == $scope.menuOptions.length) {
                    $scope.setMasterMenu();
                }
            }
        }
    };
    return master;
});