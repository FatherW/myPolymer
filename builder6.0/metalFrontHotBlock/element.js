var app = angular.module('demoApp');
//require(['store'],function(store){
        app.directive('metalFrontHotBlock', function ($ocLazyLoad,$compile, $timeout,  $mdDialog, $mdToast, $dazzleS3, $dazzleUser, $dazzlePopup) {
                   
        
            var metalFrontHotBlock = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalFrontHotBlock/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                   
                    console.log('Metal Promote Product');
                    $scope.newProducts = [];
                    $scope.getHotData = function() {
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "body": {
                                        "_source" : ["nid", "images","title","product_company","company_id","product_price"],
                                            "query": {
                                            "match_all":{}
                                        },

                                        "sort" : { "product_views" : {"order" : "desc"}}
                                    },
                                    "from":0,
                                    "size":20
                                }
                            }).then(function (result) {
                                console.log('Promote Result',result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    $scope.newProducts=[];
                                    resolve();
                                } else {
                                    $scope.newProducts = result.data.resolve;
                                //   setTimeout(function(){
                                //     	$(".home_row .grid_box .marquee_box2").kxbdMarquee({direction:"up" , scrollDelay:50});
                                //     },1000);


                                    resolve();
                                }
        
                            });
                        });
                    }
                    $scope.returnPrice = function(item){
                        if (item['product_price'])
                            return "$"+item['product_price'];
                        else
                            return "按此查詢";
                    }
        
                    $scope.loadImage = function(images) {
                        if (Array.isArray(images))
                            return images[0];
                        else
                            return images;
                    }
                    
                }
            };
            return metalFrontHotBlock;
        }); 
 
 
 



//});