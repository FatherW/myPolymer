var app = angular.module('demoApp');
app.directive('metalUserHeader', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalUserHeader';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserHeader/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
              var uid,user;
              uid = store.get('uid');
              user = store.get('subUser');
              console.log('Sub User',user);
              if (angular.isUndefined(user)  || user==null) {
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
                			console.log('Load Sub User',result);
                			if (result.data.code < 0) {
                				store.set('subUser',null);
                				$scope.user = null;
                			} else {
                				store.set('subUser',result.data.resolve);
                				$scope.user = result.data.resolve;
                			}
                		},function(err){
                		    console.log(err);
                		});
              
              } else
                  $scope.user = user;            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            var uid = store.get('uid');
              console.log('UID2',uid);
              
              $scope.getUser = function(company) {
                return new Promise(function (resolve, reject) {
                    $http({
                			"method": "post",
                			"url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                			"data":{
                				"action": "searchData",
                				"index": "5metal.dazzle.website",
                				"type": "user",
                				"body":{
                				    "query":{
                				        "match":{
                        				    'company_nid' :company  
                				        }
                				    }
                				}
                			}
                		}).then(function (result) { 
                            console.log('subUser',result);
                            store.set('subUser',result.data.resolve[0]);
                            location.reload();
                		});

                });
                  
              }
              $scope.login = function(uid){
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
                			console.log('Load Sub User',result);
                			if (result.data.code < 0) {
                				store.set('subUser',null);
                				$scope.user = null;
                			} else {
                				store.set('subUser',result.data.resolve);
                				$scope.user = result.data.resolve;
                			}
                		},function(err){
                		    console.log(err);
                		});
              }
              
			  $scope.isLogin = function() {
				  if(!angular.isUndefined($scope.user) && $scope.user != null)
					  return true;
				  else
					  return false;
			  }
			  $scope.changeUser = function() {
			      var params ={
			          name: 'metalCompanyPopup',
			          directive: '<metal-company-popup></metal-company-popup>'
			      }
			      $dazzlePopup.callPopup(params).then(function(result){
			          console.log(result);
			          $scope.getUser(result['value']);
			      });
			  }
              $scope.newLogin = function() {
                  var params = {
                      name: "metalLoginPopup",
                      directive: "<metal-login-popup></metal-login-popup>",
					  width: '425px',
					  height:'auto'
				  }
                  $dazzlePopup.callPopup(params).then(function(user){
                     // location.href = "/node/"+user['nid'];
                     console.log('User',user);
                     store.set('subUser',user);
                     $scope.user = user;
                     $compile($element.contents())($scope);
                  });
              }
             
			 $scope.logout = function() {
				 store.clearAll();
				 $scope.user = null;
				 location.href="/user/logout";
//				 $compile($element.contents())($scope);
			 }
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
         //           console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('賣貨者')>-1)
                            return true;
                        else
                            return false;
                    
                    return false;
                }

                $scope.isBuyer = function(){
           //         console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('求貨者')>-1)
                            return true;
                        else
                            return false;
                    return false;
                }
                $scope.isAdmin = function(){
                    var uid = store.get('uid');
                    console.log('UID',uid);
                    
                    if (uid =="1" || uid=="162")
                        return true;
                    else 
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




