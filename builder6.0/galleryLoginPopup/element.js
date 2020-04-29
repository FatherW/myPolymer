var app = angular.module('demoApp');
//require(['store'],function(store){
jQuery.noConflict();
(function( $ ) {
  $(function() {
        app.directive('galleryLoginPopup', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var galleryLoginPopup = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/galleryLoginPopup/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                      console.log('loginPopupController');
                        user = store.get('user');
                        console.log('User',user);
                    
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        }
                    
                        $scope.loginJson = {
                            logining: false,
                            username: "",
                            password: ""
                        };
                    
                        $scope.loginByToken = function (token) {
                                $scope.loginJson.logining = true;
                                $http({
                                    "method": "post",
                                    "url": "https://37nolo3390.execute-api.ap-northeast-1.amazonaws.com/prod",
                                    "data": {
                                        "token":token,
                                        "type": "loginByToken"
                                    }
                                }).then(function (result) {
                                    if (result.data.code > 0) {
                                        $dazzlePopup.toast('登入成功');
                                        $scope.loginJson.logining = false;
                                        store.set('user',result.data.resolve);
                                        $mdDialog.hide(result.data.resolve);
                                    }
                                }, function () {
                                    $dazzlePopup.toast('登入失敗');
                                    $scope.loginJson.logining = false;
                                });
                        }
                    
                    
                        $scope.login = function () {
                            if (!$scope.loginJson.username) {
                                $dazzlePopup.toast('請輸入用戶名');
                            } else if (!$scope.loginJson.password) {
                                $dazzlePopup.toast('請輸入密碼');
                            } else {
                                $scope.loginJson.logining = true;
                                console.log( {
                                        "type":"loginGalleryByLogin",
                                        "name": $scope.loginJson.username,
                                        "pass": $scope.loginJson.password
                                    });
                                $http({
                                    "method": "post",
                                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/login",
                                    "data": {
                                        "type":"loginGalleryByLogin",
                                        "name": $scope.loginJson.username,
                                        "pass": $scope.loginJson.password
                                    }
                                }).then(function (result) {
                                    console.log('Result',result);
                                    if (result.data.code > 0) {
                                        $dazzlePopup.toast('登入成功');
                                        $scope.loginJson.logining = false;
                                        store.set('user',result.data.resolve);
                                        //setTimeout(function(){
                                        $mdDialog.hide(result.data.resolve);
                                        //}, 5000);
                                    }
                                }, function () {
                                    $dazzlePopup.toast('登入失敗');
                                    $scope.loginJson.logining = false;
                                });
                            }
                        }
                    
                        var sendAgainInterval = null;
                        var sendAgainTimeout = null;
                        $scope.registerJson = {
                            registering: false,
                            registerCodeSent: false,
                            registerPhone: null,
                            registerCode: null,
                            theRegisterCode: Math.floor(Math.random() * 90000) + 10000,
                            sendAgainRemain: null,
                        }
                        $scope.sendRegisterCode = function () {
                            $http({
                                "method": "post",
                                "url": "https://e57jikxilj.execute-api.ap-northeast-1.amazonaws.com/prod/",
                                "data": {
                                    "to": $scope.registerJson.registerPhone,
                                    "code": "+852",
                                    "message": "你的驗証碼是:" + $scope.registerJson.theRegisterCode
                                }
                            }).then(function (result) {
                                $dazzlePopup.toast('驗証碼已發送到你的電話。');
                            }, function () {
                                $scope.registerJson.registerCodeSent = false;
                                $scope.registerJson.sendAgainRemain = null;
                            });
                            $scope.registerJson.registerCodeSent = true;
                            $scope.registerJson.sendAgainRemain = 60;
                            sendAgainInterval = setInterval(function () {
                                $scope.$apply(function () {
                                    $scope.registerJson.sendAgainRemain--;
                                });
                            }, 1000);
                            sendAgainTimeout = setTimeout(function () {
                                clearInterval(sendAgainInterval);
                                $scope.$apply(function () {
                                    $scope.registerJson.registerCodeSent = false;
                                    $scope.registerJson.sendAgainRemain = null;
                                });
                            }, 60000);
                        }
                        $scope.registerPhoneChanged = function () {
                            $scope.registerJson.sendAgainRemain = null;
                            $scope.registerJson.registerCodeSent = false;
                            $scope.registerJson.registerCode = null;
                            $scope.registerJson.theRegisterCode = Math.floor(Math.random() * 90000) + 10000;
                            clearInterval(sendAgainInterval);
                            clearTimeout(sendAgainTimeout);
                        }
                        $scope.register = function () {
                            $scope.registerJson.registering = true;
                            var password = $scope.makePassword();
                            $http({
                                "method": "post",
                                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/register",
                                "data": {
                                    "subdomain": $scope.registerJson.registerPhone,
                                    "domain": "dazzle.website",
                                    "sitename": "我的網站",
                                    "user": {
                                        "uid": $scope.registerJson.registerPhone + "." + "dazzle.website",
                                        "password": password,
                                        "registerDate": moment().valueOf(),
                                        "expiryDate": moment().add(90, 'days').valueOf(),
                                        "websiteUrl": [$scope.registerJson.registerPhone + "." + "dazzle.website"],
                                        "webdomain": [],
                                        "domains": [],
                                        "db": [],
                                        "balance": 0,
                                        "type": "user"
                                    }
                                }
                            }).then(function (result) {
                                if (result.data.code == 888 || result.data.code == 999) {
                                    $scope.sendPassword($scope.registerJson.registerPhone, password);
                                    $scope.loginJson.username = $scope.registerJson.registerPhone + "." + "dazzle.website";
                                    $scope.loginJson.password = password;
                                    $scope.login();
                                } else {
                                    $dazzlePopup.toast('註冊失敗，用戶已存在');
                                    $scope.registerJson.registering = false;
                                    $scope.registerPhoneChanged();
                                }
                            }, function () {
                                $scope.sendPassword($scope.registerJson.registerPhone, password);
                            });
                        }
                        $scope.sendPassword = function (phone, password) {
                            $http({
                                "method": "post",
                                "url": "https://e57jikxilj.execute-api.ap-northeast-1.amazonaws.com/prod/",
                                "data": {
                                    "to": phone,
                                    "code": "+852",
                                    "message": "你的登錄帳號是:" + phone + '.dazzle.website' + "\n" + "你的登錄密碼是:" + password
                                }
                            }).then(function (result) {
                                $dazzlePopup.alert("註冊成功，登錄密碼將會發送到你的電話。").then(function () {
                                    location.reload();
                                });
                            });
                        }
                        $scope.makePassword = function () {
                            var password = "";
                            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
                            for (var i = 0; i < 5; i++) {
                                password += possible.charAt(Math.floor(Math.random() * possible.length))
                            }
                            return password;
                        }
                    
                }
            };
            return galleryLoginPopup;
        }); 
 
 
 
 
  });
})(jQuery);
 



//});