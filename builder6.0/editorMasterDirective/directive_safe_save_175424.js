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
                $scope.model = $scope.atom[$scope.model.masterId];
            }
            $scope.setMasterMenu = function () {
                $scope.menuOptions.push(["設成Master", function () {
                    $mdDialog.show({
                        templateUrl: 'models/masterPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'masterPopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: $scope
                        }
                    });
                }], ["選擇Master", function () {
                    $scope.model.masterId = 'ele1489393393207';
                    $scope.compile();
                }]);
            }
            for (var i = 0; i < $scope.menuOptions.length; i++) {
                if ($scope.menuOptions[i][0] == '設成Master' || $scope.menuOptions[i][0] == '選擇Master') {
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