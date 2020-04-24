app.directive('myReply', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {

            $scope.beforeTime = function(timestamp){
                var diff;
                diff=Math.round(new Date().getTime()/1000) -timestamp;
                console.log(diff);
            }

            $scope.replyInit = function(id) {

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "chats",
                            "body": {
                                "query":{
                                    "match":{
                                        "parent": id
                                    }
                                },
                                "sort":[
                                    {"timestamp":{"order":"desc"}}
                                ],
                                "from":0,
                                "size":100
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Login Unsucessful');
                            $scope.replies = [];

                        } else {
                            //console.log('ID',id,result.data.resolve);
                            $scope.replies = result.data.resolve;
                            console.log('Replies',$scope.replies);
                        }
                    });

            }


        }
    };
    return dazzleData;
});