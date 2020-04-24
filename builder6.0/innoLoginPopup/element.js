var app = angular.module('demoApp');
app.directive('innoLoginPopup', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser,  $dazzlePopup, $ocLazyLoad,hotkeys) {
    var name = 'innoLoginPopup';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/innoLoginPopup/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            console.log('loginPopupController');
        
            $scope.cancel = function () {
                $mdDialog.cancel();
            }
        
            $scope.loginJson = {
                logining: false,
                username: '',
                password:'' 
            };
        
            $scope.init = function() {

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
        		  
        
            $scope.log = function () {
                if (!$scope.login) {
                    $dazzlePopup.toast('請輸入用戶名');
                } else if (!$scope.password) {
                    $dazzlePopup.toast('請輸入密碼');
                } else {
                    $scope.loginJson.logining = true;
                    var json = {
                            "uid": location.hostname,
                            "login":$scope.login,
                            "password": $scope.password
                        };
                    console.log(json);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                        "data": {
                            "action":"login",
                            "uid":location.hostname,
                            "login": $scope.login,
                            "password": $scope.password,
                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            $dazzlePopup.toast('登入成功');
                            $scope.loginJson.logining = false;
                            store.set('subUser',result.data.resolve);
                            location.reload();
                        } else {
                            console.log(result);
                            $dazzlePopup.toast('登入失敗');
                            $scope.loginJson.logining = false;
                        }
                    }, function () {
                        $dazzlePopup.toast('登入失敗');
                        $scope.loginJson.logining = false;
                    });
                }
            }
            



        }
    };
    return link;
});