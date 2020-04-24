var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.initMaster = function () {
                if (angular.isUndefined($scope.model)) {
                    setTimeout(function () {
                        console.log("This model still loading,master will init 0.5s later", $element);
                        $scope.initMaster();
                    }, 500);
                    return;
                }
                console.log($scope.model);
                if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                    $scope.model.masterId = $scope.model.id;
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                    //console.log('Master Init',$scope.model.id);
                } else {
                    //console.log('Master ID',$element.attr('id'));
                    $scope.model.masterId = $element.attr('id');
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                    $scope.atom[$scope.model.id] = $scope.model;
                }


                $scope.model = $scope.masterAtom[$scope.model.masterId];
                //console.log('Master ID',$scope.model.masterId);
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
                            $scope.atom[$scope.model.id] = $scope.model;
                        });
                    }]);
                }
                for (var i = 0; i < $scope.menuOptions.length; i++) {
                    if ($scope.menuOptions[i][0] == '模版') {
                        return;
                    }
                    if (i + 1 == $scope.menuOptions.length) {
                        //$scope.setMasterMenu();
                    }
                }
            };
            $scope.initMaster();
        }
    };
    return master;
});