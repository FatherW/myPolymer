var app = angular.module('demoApp');

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

app.directive('dzLoginPopup', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn) {
    var name = 'dzLoginPopup';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzLoginPopup/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
           compile: function (tElem, tAttrs) {
               return {
                   pre: function ($scope, iElem, iAttrs) {
                       $('head').append('<meta name="google-signin-client_id" content="857923446432-upl57fb55704nn1fu1jp2v7f4m3cdkic.apps.googleusercontent.com">');
                        $ocLazyLoad.load("https://apis.google.com/js/platform.js", {cache: false});
                   }
               }
       },
        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
    console.log('loginPopupController');
    var user = store.get('user') || null;
    console.log('Login User',user);

    store.set('user',null);
    user = store.get('user') || null;

    $scope.regAvailability = {
        "uid":false,
        "mobile":false,
        "confirm":false
    };

	$scope.domainExist = false;
	

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

    $scope.init = function() {
        if (user) {
            $scope.loginJson['username'] = user['uid'];
            $scope.loginJson['password'] = user['password'];
            $scope.login();
        }        
    }

	 hotkeys.add({
		combo: 'ctrl+down',
		description: 'This one goes to 11',
		callback: function() {
			store.set('editMode','normal');
			location.reload();	
		}
	  });


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
    $scope.login = function () {
        if (!$scope.loginJson.username) {
            $dazzlePopup.toast('請輸入用戶名');
        } else if (!$scope.loginJson.password) {
            $dazzlePopup.toast('請輸入密碼');
        } else {
            $scope.loginJson.logining = true;
            var json = {
                    "uid": $scope.loginJson.username,
                    "password": $scope.loginJson.password,
                    "type": "loginByUidPassword"
                };
            console.log(json);
            $http({
                "method": "post",
                "url": "https://37nolo3390.execute-api.ap-northeast-1.amazonaws.com/prod",
                "data": {
                    "uid": $scope.loginJson.username,
                    "password": $scope.loginJson.password,
                    "type": "loginByUidPassword"
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    $dazzlePopup.toast('登入成功');
                    $scope.loginJson.logining = false;
                    store.set('user',result.data.resolve);
                    console.log('User',result.data.resolve);
                    
                    if (result.data.resolve['uid'] =="dazzleadmin"){
						console.log('I am admin');
						store.set('userType','admin');
					} else {
						store.set('userType','normal');
					}
//						$('body').html('<admin-dashboard></admin-dashboard>');
 //                       window.location.href = "https://dashboard.dazzle.website/index.html?token:===:" + result.data.resolve.token;
                        
                    $dazzleUser.dazzleInfo['exportBucket'] = result.data.resolve['exportBucket'];
                    //store.set('editMode','admin');
                    //location.reload();
                    $mdDialog.hide(result.data.resolve);
                    
                } else {
                    console.log(result);
                    $dazzlePopup.toast('登入失敗');
                    $scope.loginJson.logining = false;
                }
            }, function () {
                $dazzlePopup.toast('登入失敗');
                $scope.loginJson.logining = false;
                $compile($element.contents())($scope);
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