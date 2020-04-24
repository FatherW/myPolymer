var app = angular.module('demoApp');
app.directive('metalDeleteButton', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalDeleteButton';
    var link = {
        restrict: 'E',
        scope:  {
           'type': '@type',
           'id': '='
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalDeleteButton/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            
            
             $scope.delete = function() {
        
                 
                 json = {
                            "action": "deleteData",
                            "index": "5metal.dazzle.website",
                            "type": $scope.type,
                            "id": $scope.id
                        };
                $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":json
                    }).then(function (result) {
                            if (result.data.code < 0) {
                            alert('更新失敗');
                        } else {
                            alert('成功更新');
                        }
                    });
                
            }
         
            
            $scope.isAdmin = function(){
//                var user = store.get('user');
                var user= store.get('subUser') || null;
        
                if (!user)
                    return false;
                    
                var uid = user.uid;
                
				if (uid=="1" || uid=="162")
					return true;                    
                
                
            }
            

        }
    };
    return link;
});