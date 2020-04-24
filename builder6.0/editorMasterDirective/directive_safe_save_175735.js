var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            console.log($element);
            $scope.initMaster = function () {
                if (angular.isUndefined($scope.model)) {
                    setTimeout(function () {
                        console.log("This model still loading,master will init 0.5s later", $element);
                        $scope.initMaster();
                    }, 500);
                    return;
                }
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
            };
            $scope.initMaster();
        }
    };
    return master;
});