var app = angular.module('demoApp',[]);
app.controller('formCtrl', function ($scope,$http) {
    $scope.json={};
    $scope.submit = function() {
          $http({
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-form",
            "data": {
                "uid":"cccg.dazzle.website",
                "website":"贐明會",
                "json":$scope.json                
            }
        }).then(function (result) {
            if (result.Result.code > 0) {
                  send("support@01power.net", "henry@01power.net", $scope.json['標題'], $scope.json['訊息'],"");
            } else {
                alert("傳送失敗");
            }
            console.log(result);
            // Fill up description and thumbnail

        });
    
    };
    function send(from, to, subject, text, html) {
         $http({
            "method": "post",
            "url": "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/sendmail",
            "data": {
                "from":from,
                "to":to,
                "text":text,
                "html":html
            }
        }).then(function (result) {
            if (result.Result.code > 0) {
                alert("傳送成功");
            }  else {
                 alert("傳送失敗");
                console.log(result);
            }
            // Fill up description and thumbnail
        });
    }
});



  