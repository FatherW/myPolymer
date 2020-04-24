var app = angular.module('demoApp');

app.directive('hkfspaData', function ($compile,$http,$templateRequest,$dazzleInit,$dazzleUser,$dazzlePopup,$dazzleFn,$dazzleData,$mdDialog,dbFactory,dzS3) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function ($scope, $element, attrs) {
                     
                $scope.table = $element.attr('data-table') || null;
                $scope.count = $element.attr('data-count') || 'all';
                $scope.sort = $element.attr('data-sort') || null;
                $scope.order = $element.attr('data-order') || null;
                $scope.filter = $element.attr('data-filter') || null;

                // Load Data
                $dazzleUser.dazzleInfo['data'] =[];
                var id = $element.attr('id');
                console.log('Table',$scope.table);
               
                dbFactory.loadData($scope.table,$scope.count).then(function(data){
                   console.log('Data',$scope.data);
                   $scope.data = data; 
                //   dzS3.saveData($scope.table+'-data.json',data);
                });

                $compile($element.contents())($scope);            

        },
        controller: function ($scope, $element, $attrs) {
            
         $scope.menuOptions=["資料管理", function() {
                
             
         }];            

        }
    };
    return dazzleData;
});

