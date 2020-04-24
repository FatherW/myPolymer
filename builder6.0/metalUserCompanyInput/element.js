var app = angular.module('demoApp');
app.directive('metalUserCompanyInput', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn) {
    var name = 'metalUserCompanyInput';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserCompanyInput/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
              var uid = store.get('uid');
                            if (!uid) {
                                $scope.isLogin = false;
                            } else {
                                  $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data":{
                                            "action": "getData",
                                            "index": "5metal.dazzle.website",
                                            "type": "user",
                                            "id":uid
                                        }
                                    }).then(function (result) {
                                        console.log(result);
                                        if (result.data.code < 0) {
                                            console.log('Unsuccess');
                                            $scope.isLogin = false;
                                            $scope.user = null;
                                        } else {
                                            $scope.isLogin = true;
                                            $scope.user = result.data.resolve;
                                            store.set('subUser',$scope.user);
                                            // $scope.getCompanyId($scope.user['user_company']).then(function(nid){
                                            //     $scope.user['company_id'] = nid;
                                            //     $scope.company_id = nid;
                                            //     console.log('Result',$scope.user);
                                            //     resolve();
                                            // });
                                        }
                                    });
                            }          
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

                $scope.getCompanyId = function(name){
                    return new Promise(function (resolve, reject) {
                         $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "company",
                                "body":{
                                   "query": {
                                       "match": { "title": name}
                                   }
                                }
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                resolve(null);
    //                            resolve({});
                            } else {
                                resolve(result.data.resolve[0]['nid']);
                            }
                        });
                    });
                }

                $scope.isSeller = function(){
                    console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('賣貨者')>-1)
                            return true;
                        else
                            return false;
                    
                    return false;
                }

                $scope.isBuyer = function(){
                    console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('求貨者')>-1)
                            return true;
                        else
                            return false;
                    return false;
                }
                
                $scope.addProduct = function(){
                    var params = {
                       name: 'metalProductAddPopup',
                       directive:'<metal-product-add-popup></metal-product-add-popup>',
                       user: $scope.user
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(result){
                        
                    });
                }
                
                

        }
    };
    return link;
});




