var app = angular.module('demoApp');
app.directive('dzSelectPopup', function ($compile, $templateRequest, $mdDialog, $uibModal,$mdToast,dbFactory,userInfo) {
    var name = 'dzSelectPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://dazzle-template.s3.amazonaws.com/builder6.0/dzSelectPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://dazzle-template.s3.amazonaws.com/";
            scope.directiveId = "dzSelectPopup";
            scope.type = "dzSelectPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.options = params.options;
                $scope.select = params.select;
                $scope.table = {};
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');

                $scope.table =   {
                    "id":"",
                    "label":"",
                    "data": {
                        "type": "dynamodb",
                        "table": "",
                        "index":userInfo.exportBucket,
                        "key":"id"
                    },
                    "buttons": []
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            
                $scope.add = function() {
                    dbFactory.getTableList().then(function(tables){
                       angular.forEach(tables,function(item,key){
                           if (item.id==$scope.table.id){
                                alert('資料表ID 已有，請重新輸入');
                                return;                               
                           }
                       }); 
                       $scope.table.data.table = $scope.table.id;
                       tables.push($scope.table);
                       dbFactory.addIndex($scope.table);
                       dbFactory.saveTableList(tables);
                    });
                }
                $scope.choose = function(id){
                    $mdDialog.hide(id);
                }
                $scope.save = function () {
                    $mdDialog.hide($scope.select);
                };
            
        }
    };
    return link;
});