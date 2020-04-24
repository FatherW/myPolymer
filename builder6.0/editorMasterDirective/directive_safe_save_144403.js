var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                $scope.model.masterId = $attrs.id;
                $scope.masterAtom[$scope.model.masterId] = $scope.model;
            }
            $scope.model = $scope.masterAtom[$scope.model.masterId];
            $scope.setMasterMenu = function () {
                $scope.menuOptions.push(["模版", function () {
                    $mdDialog.show({
                        templateUrl: 'models/masterPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'masterPopupController',
                        clickOutsideToClose: true,
                        parent: angular.element(document.body),
                        locals: {
                            rootScope: $scope,
                            model: $scope.model
                        }
                    }).then(function (master) {
                        $scope.model.masterId = master.id;
                        $scope.compile();
                    });
                }]);
            }
            for (var i = 0; i < $scope.menuOptions.length; i++) {
                if ($scope.menuOptions[i][0] == '模版') {
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