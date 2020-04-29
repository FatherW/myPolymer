var app = angular.module('demoApp');
//require(['store'],function(store){
        app.directive('metalFrontNewBlock', function ($ocLazyLoad,$compile, $timeout, $mdDialog, $mdToast, $dazzleS3, $dazzleUser, $dazzlePopup) {
                   
        
            var metalFrontNewBlock = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalFrontNewBlock/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                   
                    console.log('Metal Promote Product');
                    $scope.newProducts = [];
                   $scope.returnPrice = function(item){
                        if (item['product_price'])
                            return "$"+item['product_price'];
                        else
                            return "按此查詢";
                    }
                    
                    
                     $scope.menuOptions = [

                            ["刪除", function ($itemScope,$event) {
                                
            
                            }]
                        ];
                    $scope.getData = function() {
                        
                        // var newProducts = store.get('newProducts');
                        // if (!angular.isUndefined(newProducts)) {
                        //     $scope.newProducts = newProducts;
                        //     return;
                        // }

                            
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "body": {
                                        "_source" : ["nid", "images","title","product_company","company_id"],
                                            "query": {
                                            "match_all":{}
                                        },

                                        "sort" : { "created" : {"order" : "desc"}}
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
                                    store.set('newProducts',$scope.newProducts);
                                //   setTimeout(function(){
                                //     	$(".home_row .grid_box .marquee_box3").kxbdMarquee({direction:"up" , scrollDelay:50});
                                //     },1000);


                                    resolve();
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
                    
                }
            };
            return metalFrontNewBlock;
        }); 
 
 
 



//});