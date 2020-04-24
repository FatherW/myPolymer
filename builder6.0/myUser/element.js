
app.directive('myUser', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {


            $scope.userInit = function(id) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "www.skmgps.org",
                        "type": "user",
                        "id": id
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $scope.model = "無名氏";

                    } else {
                        $scope.model = result.data.resolve;
                    }
                });


            }


        }
    };
    return dazzleData;
});