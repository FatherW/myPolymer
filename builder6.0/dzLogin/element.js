var app = angular.module('demoApp');
app.directive('dzLogin', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn) {
    var name = 'dzLogin';
    var link = {
        restrict: 'EA',
        controllerAs: 'dzLogin',
        scope:  true,
//        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzLoginPopup/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
    $scope.regAvailability = {
        "uid":false,
        "mobile":false,
        "confirm":false
    };

	$scope.domainExist = false;
    $scope.user = {
        "login":"",
        "password":""
    }	

	$scope.regSubmit = function(){
		$http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                "data": {
                    "action": "register",
					"user": $scope.register,
					"regTime":new Date().getTime(),
					"type":"normal"
                }
            }).then(function (result) {
				console.log('REsult',result);
                if (result.data.code > 0) {
                    alert('成功註冊. 請留意電話短訊.');
                    
                }

				else
                    alert('註冊失敗. 請聯絡我們客戶服務');
				
			}, function () {
                    alert('註冊失敗. 請聯絡我們客戶服務');
            });
	}

	$scope.checkExist = function(){
		$http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                "data": {
                    "action": "checkDomain",
					"domain": $scope.registerJson.domain+'.dazzle.website'
                }
            }).then(function (result) {
				console.log('REsult',result);
                if (result.data.code > 0) 
					$scope.domainExist =true;
				else
					$scope.domainExist = false;
				
				$compile($element.contents())($scope);
			}, function () {
				$scope.domainExist = false;
            });
	}
    $scope.cancel = function () {
        $('#dz-init-overlay').hide();
        $mdDialog.cancel();
    }

    $scope.loginJson = {
        logining: false,
        username: '',
        password:'' 
    };



    $scope.loadLogo = function (){

        return "http://dazzle.website/image/lgo.png";
    }
		  
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
                    $dazzleUser.dazzleInfo['exportBucket'] = result.data.resolve['exportBucket'];
                    $mdDialog.hide(result.data.resolve);
                }
            }, function () {
                $dazzlePopup.toast('登入失敗');
                $scope.loginJson.logining = false;
            });
    }
    
    $scope.updateAvailablity = function(type,ans){
        $('#dz-pregress-'+type).hide();
        if (ans){
            $scope.regAvailability[type] =true; 
            $('#av_domain-'+type).css('color','green').css('opacity',1).show();
            $('#av_undomain-'+type).css('color','red').css('opacity',1).hide();
            $scope.registerCheck[type] = true;
        } else {
            $scope.regAvailability[type] =false; 
            $('#av_domain-'+type).css('color','green').css('opacity',1).hide();
            $('#av_undomain-'+type).css('color','red').css('opacity',1).show();
            $scope.registerCheck[type] = false;  
        }
    }
     $scope.checkUid = function(){
            $('#dz-pregress-uid').show();
            dzFn.checkUidAvailability($scope.register.uid).then(function(answer){
                    $scope.updateAvailablity('uid',true);
            },function(){
                    $scope.updateAvailablity('uid',false);
            });                       
        }
        
    $scope.checkMobile = function(){
        $scope.updateAvailability('mobile',true);

        // $('#dz-pregress-mobile').show();
        //     dzFn.checkMobileAvailability($scope.register.mobile).then(function(answer){
        //             $scope.updateAvailablity('mobile',true);
        //     },function(){
        //             $scope.updateAvailablity('mobile',false);
        //     });                       

    }    
                
    $scope.checkEmail = function(){
        $('#dz-pregress-mobile').show();
            dzFn.checkEmailAvailability($scope.register.email).then(function(answer){
                
                    $scope.updateAvailablity('mobile',true);
            },function(){
                    $scope.updateAvailablity('mobile',false);
            });                       

    }  
    this.login = function () {
        return new Promise(function (resolve, reject) {

                if (!$scope.user.login) {
                    $dazzlePopup.toast('請輸入用戶名');
                } else if (!$scope.user.password) {
                    $dazzlePopup.toast('請輸入密碼');
                } else {
                    $scope.loginJson.logining = true;
                    var json = {
                            "uid": location.hostname,
                            "login":$scope.user['login'],
                            "action": "login",
                            "password":$scope.user['password']
                        };
                    console.log(json);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                        "data":json
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            store.set('subUser',result.data.resolve);
                            console.log(store.get('subUser'));
                            $dazzlePopup.toast('登入成功');
                            resolve(result.data.resolve);                    
        
                        } else {
                            console.log(result);
                            $dazzlePopup.toast('登入失敗');
                            reject();
                        }
                    }, function () {
                        $dazzlePopup.toast('登入失敗');
                        reject();
                    });
                }
        });
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
		domain: ''
    }
    
    $scope.checkReg = function(){
        
        var reg = $scope.regAvailability;
        for (i in reg){
            if (!reg[i])
                return false;
        }        
        return true;
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

  $scope.forgetPW = function(){
      var uid = $scope.loginJson.username;
      if (!uid)
        alert("未填上用戶名");
    	$http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                "data": {
                    "action": "forgetPW",
					"user": uid
                }
            }).then(function (result) {
				console.log('REsult',result);
                if (result.data.code > 0) {
                    alert('成功發送密碼. 請留意電話短訊.');
                    
                }

				else
                    alert('發送失敗. 請聯絡支援');
				
			}, function () {
                    alert('發送失敗. 請聯絡支援');
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
    return link;
});
  

