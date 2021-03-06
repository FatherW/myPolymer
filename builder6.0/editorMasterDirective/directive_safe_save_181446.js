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
                        //console.log("This model still loading,master will init 0.5s later", $element);
                        $scope.initMaster();
                    }, 500);
                    return;
                }
                if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                    $scope.model.masterId = $scope.model.id;
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                } else {
                    $scope.model.masterId = $element.attr('id');
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                    $scope.atom[$scope.model.id] = $scope.model;
                }

                $scope.model = $scope.masterAtom[$scope.model.masterId];
            };

            if ($element[0].nodeName == 'EDITOR-CONTAINER-ELEMENT') {
                var id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
                $element.attr('id', id);
                if (angular.isUndefined($scope.masterAtom[id])) {
                    $scope.masterAtom[$scope.id] = {
                        "id": id,
                        "masterId": id,
                        "type": "editor-container-element"
                    };
                }
                setTimeout(function () {
                    console.log($element.html());
                }, 500);
            } else {
                $scope.initMaster();
            }

        }
    };
    return master;
});