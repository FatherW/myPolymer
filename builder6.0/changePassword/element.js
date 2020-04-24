
app.directive('changePassword', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {

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


        }
    };
    return dazzleData;
});