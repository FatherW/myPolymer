var app = angular.module('demoApp');
app.directive('metalProduct', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalProduct';
    var link = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalProduct/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {
            // var user = store.get('user');
            // if (!angular.isUndefined(user)) {
            //         scope.inited = true;                    
            // }
            // else
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
              $scope.metal = {
                  'title':'abcde'
              }
              $scope.init = function(id) {
                  
                  
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id": id
                        }
                    }).then(function (result) {
                        console.log('Metal Product',result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                            resolve();
                        } else {
                            //console.log('ID',id,result.data.resolve);
                                $scope.metal = result.data.resolve; 
                                $compile($element.contents())($scope);
                                resolve();
                            //console.log('Success');
                        }

                    });
                });
            }

            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }

            $scope.myDate = function(timestamp){
                //console.log(timestamp);
                if (timestamp> 1000000000000)
                    return new Date(timestamp).toLocaleDateString();
                else
                    return new Date(timestamp*1000).toLocaleDateString();
            }
        }
    };
    return link;
});