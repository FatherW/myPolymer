
var app = angular.module('demoApp');
app.directive('dzFormSettingsPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit) {
    var name = 'dzFormSettingsPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzFormSettingsPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzFormSettingsPopup";
            scope.type = "dzFormSettingsPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

             
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                
                $scope.selectedIndex = 0;
                $scope.selectedTid = 0;
                $scope.categories = params.categories;
                
                $scope.save = function(){
                     $mdDialog.hide($scope.categories);
                }
                $scope.addCategory = function(cat){
                    if ($scope.categories.indexOf(cat['name']<0)){
                        $scope.categories.push(cat['name']);
                        $scope.selectedTid = cat['tid'];
                        $scope.getSubCategoryChildren(cat['tid']).then(function(){
                            $scope.$apply(function(){
                                $scope.selectedIndex = 1;                                
                            });

                        });
                        
                    }

                }
                 $scope.addSubCategory = function(cat){
                    if ($scope.categories.indexOf(cat['name']<0)){
                        $scope.categories.push(cat['name']);
                        $scope.selectedTid = cat['tid'];
                        $scope.getSubCategoryChildren(cat['tid']).then(function(){
                            $scope.$apply(function(){
                                $scope.selectedIndex = 2;                                
                            });

                        });
                        
                    }

                }
                $scope.getSubCategoryChildren = function(tid){
                    console.log('Tid To Category');
                    return new Promise(function (resolve, reject) {
            
                        console.log('company Init');
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "product_category",
                                "body": {
                                    "query":{
                                        "match":{
                                            "parent":tid
                                        }
                                    }
                                }
            
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $scope.subCatChildren = [];
                                resolve([]);
                            } else {
                                $scope.subCatChildren = result.data.resolve;
                                resolve(result.data.resolve);
                            }
                        });
                    });
            
                }
                $scope.getCategoryChildren = function(tid){
                    console.log('Tid To Category');
                    return new Promise(function (resolve, reject) {
            
                        console.log('company Init');
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "product_category",
                                "body": {
                                    "query":{
                                        "match":{
                                            "parent":tid
                                        }
                                    }
                                }
            
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $scope.catChildren = [];
                                resolve([]);
                            } else {
                                $scope.catChildren = result.data.resolve;
                                resolve(result.data.resolve);
                            }
                        });
                    });
            
                }
             
        }
    };
    return link;
});
