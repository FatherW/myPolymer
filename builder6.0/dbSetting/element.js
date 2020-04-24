var app = angular.module('demoApp');
app.directive('dbSetting', function ($mdDialog, $dazzlePopup) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.setDataMenu = function () {
                $scope.menuOptions.push(["資料管理", function () {
                    var params = {
                        db:$scope.model.db|| {},
                      directive: '<db-setting-popup></db-setting-popup>'  
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                       $scope.model.db = result; 
                       console.log($scope.model);
                    });

                    // $dazzlePopup.dataManagement($scope.websiteId, $scope.table).then(function () {
                    //     if ($scope.updateData) {
                    //         $scope.updateData();
                    //     }
                    // });
                }]);
            }

            console.log('Menu Options',$scope.menuOptions);
            setTimeout(function(){
               console.log('Menu Options 2',$scope.menuOptions); 
                if ($scope.menuOptions.length == 0) {
                    $scope.setDataMenu();
                }
                for (var i = 0; i < $scope.menuOptions.length; i++) {
                    if ($scope.menuOptions[i][0] == "資料管理") {
                        return;
                    }
                    if (i + 1 == $scope.menuOptions.length) {
                        $scope.setDataMenu();
                    }
                }
            },3000);
        }
    };
    return master;
});