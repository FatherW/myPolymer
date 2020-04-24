


var app = angular.module('demoApp');
app.directive('skmgpsUser', function ($compile, $templateRequest, $mdDialog, $uibModal,$http) {
    var skmgpsUser = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function ($scope, $element, attrs) {
            // scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            // scope.directiveId = "skmgpsUser";
            // scope.type = "skmgpsUser";
            // scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            // scope.templateUrl = scope.http + scope.templatePath;
            // scope.editorCustomInit(scope, element, attrs).then(function () {

            //     var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
            //     element.html(template);
            //     $compile(template)(scope);
            // });


            
        },
        controller: function ($scope, $element, $attrs) {
            var user = store.get('client-user');
            if (!angular.isUndefined(user) && user) {
                    $scope.user = user;
                    $scope.logined = true;                    
            } else 
                $scope.logined = false;
                
                console.log(user,$scope.logined);
            
            $compile($element.contents())($scope);
            
            
            $scope.searchUser = function(login,password){
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "user",
                            "body": {
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {"login": login},
                                            },
                                            {
                                                "match": {"password": password}
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            alert('你的帳號或密碼不正確');
                            reject();
                        } else {
                            resolve();
                        }
                    });
                });
            }
        
            $scope.contactus = function() {
                var from = "support@01power.net";
                var to = "ssleung288@yahoo.com.hk";
                var subject ="客戶查詢";
                var text = $scope.name+ "\n" + $scope.content;
                    return new Promise(function (resolve, reject) {
                        console.log('Load DynamoDB Data');
                        $http({
                            "method": "post",
                            "url": "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail",
                            "data": {
                                "from": from,       // sender address
                                "to": to,           // list of receivers
                                "subject": subject, // Subject line
                                "text": text        // html body
        
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                alert('發送失敗');
                                reject();
                            } else {
                                alert('發送成功');
                                resolve();
                            }
                        });
                    });
            }
        
            $scope.submit = function(){
                if ($scope.newPassword != $scope.reNewPassword){
                    alert('兩次輸入的新密碼不一樣，請檢查清楚。');
                    return;
                }
        
                $scope.searchUser($scope.login,$scope.password).then(function(){
                    $scope.changePassword($scope.login,$scope.newPassword);
                });
            }
            $scope.changePassword = function(id,pw) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "updateData",
                        "index": "www.skmgps.org",
                        "type": "user",
                        "id": id,
                        "body":{
                            "doc":{
                                "password":pw
                            }
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        alert('更新失敗');
                    } else {
                        alert('更新成功');
                    }
                });
        
            }            
            
           $scope.login = function() {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "index": "www.skmgps.org",
                        "type": "user",
                        "body": {
                            "query":{
                                "match":{
                                    "login": $scope.id

                                }
                            }
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Login Unsucessful');
                    } else {
                        //console.log('ID',id,result.data.resolve);
                        $scope.model = result.data.resolve[0];

                        if ($scope.model['password'] == $scope.password) {
                            store.set('client-user',$scope.model);
                            console.log(store.get('client-user'));
                            console.log('Login Success');
                            $scope.user = $scope.model;
                            location.reload();
                            //location.href="index.html";
                        }
                        else
                            console.log('Login Unsuccessful');
                    }
                });

            }
        
            $scope.logout = function() {
                store.clearAll();
                location.reload();
            }
        }
    };
    return skmgpsUser;
});