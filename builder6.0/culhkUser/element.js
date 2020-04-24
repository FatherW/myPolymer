        console.log('Rainbow User');

var app = angular.module('demoApp');
app.directive('culhkUser', function ($compile, $mdDialog,$dazzlePopup,$dazzleUser,$http,$dazzleElastic) {
    var dzUser = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/culhkUser/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {

            //            $compile(element.contents)(scope);
        },
        controller: function ($scope, $element, $attrs) {
            
            var user = store.get('rainbow-user');
            console.log('Rainbow Control User',user);
            $scope.toggleLogin = function(login){
                if (login){
                    $('#logined').show();
                    $('#login').hide();
                } else {
                    $('#logined').hide();
                    $('#login').show();
                }

            }
            if (!angular.isUndefined(user)){
                $scope.user = user;
                if (angular.isUndefined(user['購物籃']))
                    $scope.user['購物籃']= [];
                $scope.logined = true;
                $scope.toggleLogin(true);
            }
            else{
                $scope.logined = false;
                $scope.toggleLogin(false);
            }
            $scope.cart = function() {
                location.href = "購物車.html";
            }
            
            $scope.orderRecord = function() {
                var params = {
                    name: "dzOrderHistoryPopup",
                    directive: '<dz-order-history-popup></dz-order-history-popup>'
                }
                $dazzlePopup.callPopup(params).then(function(result){
                    
                });
            }
        
            $scope.login = function() {
            var id = $('#login-text').val();
            var password = $('#password-text').val();
                console.log('Login...');
                console.log(id,password);
                console.log( {
                        "action": "searchData",
                        "index": "www.rainbowcu.org.hk",
                        "type": "user",
                        "body":{
                            "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"login":id}},
                                        {"match":{"password":password}}
                                    ]
                                }
                            }
                        }
                    });
              return new Promise(function (resolve, reject) {

                 $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": "www.rainbowcu.org.hk",
                        "type": "user",
                        "body":{
                            "query":{
                                "bool":{
                                    "must":[
                                        {"match":{"login":id}},
                                        {"match":{"password":password}}
                                    ]
                                }
                            }
                        }
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {
                        console.log(result);
                        $dazzlePopup.toast("登入失敗");
                        reject();
                    } else {
                        if(result.data.resolve.length){
                            console.log('Result',result);
                            $dazzlePopup.toast("成功");
                            $scope.logined = true;
                            $scope.toggleLogin(true);
                            $scope.user = result.data.resolve[0];
                            store.set('rainbow-user',$scope.user);
                            console.log($scope.user);
                            resolve($scope.user);                            
                        } else {
                           $dazzlePopup.toast("登入失敗");
                            reject();   
                        }

                    }
                });
              });
            }
            $scope.showValue = function(val){
                if (!val)
                    val = 0;
                return parseFloat(val);
            }
            $scope.logout = function() {
                store.remove('rainbow-user');
                $scope.logined = false;
                $scope.toggleLogin(false);
            }           

        }

    };
    return dzUser;
});