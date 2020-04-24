var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('yesicanUserHeader', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/yesicanUserHeader/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/yesicanUserHeader/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   
                $scope.isUser = function(){
                    if ($scope.subUser == null)
                        return false;
                    else
                        return true;
                }


        },
        controller: function ($scope, $element, $attrs,$http) {
                $scope.isLogin = function(){
                    return true;
                }
                
                
                	console.log('bb');
                	$scope.init = function() {
                		console.log('Init');
                	    $scope.subUser = store.get('subUser');   
                	    console.log($scope.subUser);
                	}
                	$scope.logout = function() {
                
                		console.log('Logout');
                		store.clear('subUser');
                		location.href="index.html";
                	}
                	
                	$scope.login=function() {
                            $mdDialog.show({
                              controller: DialogController,
                              templateUrl: 'login.html',
                              parent: angular.element(document.body),
                              clickOutsideToClose:true,
                              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                            })
                            .then(function(user) {
                                console.log(user);
                                 $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-s3-login",
                                        "data": user
                                    }).then(function (data) {
                                        console.log('Result',data);
                                        if (data.data.code > 0) {
                                            $scope.logined = true;
                                            $scope.subUser = data.data.data;
                                            store.set('subUser',$scope.subUser);
                                            console.log($scope.subUser);
                                            location.href = '我的申請.html';
                //                            resolve();
                                        } else {
                //                            reject();
                                        }
                                });
                            }, function() {
                            });
                
                	}
                           function DialogController($scope, $mdDialog,$http) {
                            $scope.hide = function() {
                              $mdDialog.hide();
                            };
                        
                            $scope.cancel = function() {
                              $mdDialog.cancel();
                            };
                        
                			$scope.register = function() {
                				console.log('register');
                				location.href="獎學金申請.html";
                			
                			}
                
                            $scope.login = function() {
                                var user = {
                                  uid:'www.yesican.org.hk',
                                  website:'原來我都得獎學金',
                                  login: $scope.name,
                                  password: $scope.password,
                				  "userTable":"user",
                				  "loginField":"電郵",
                				  "passwordField" :"password",
                                  action: 'elastic',
                                };
                              $mdDialog.hide(user);
                            };
                          }
        }
    };
    return dzSlider;
});

