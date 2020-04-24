var app = angular.module('demoApp');
//require(['store'],function(store){
// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
        app.directive('metalPromoteProduct', function ($compile, $timeout,  $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup) {
                   
        
            var metalPromoteProduct = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalPromoteProduct/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                   
                    console.log('Metal Promote Product');
                    $scope.promoteProducts = [];
                    $scope.loadRandomProduct = function() {
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "body": {
                                        "_source" : ["nid", "images","title","product_company"],
                                        "query":{
                                            "match_all":{}
                                        },
                                        "random_score" : {},
                                        "from":0,
                                        "size":20
        
                                    }
                                }
                            }).then(function (result) {
                                console.log('Promote Result',result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    resolve();
                                } else {
        
                                    $scope.promoteProducts = $scope.promoteProducts.concat(result.data.resolve);
                                    console.log('Promote Product',$scope.promoteProducts);
                                    resolve();
                                }
        
                            });
                        });
                    }
                    $scope.loadProduct = function(query) {
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "body": {
                                        "_source" : ["nid", "images","title","product_company"],
                                        "query":query,
                                        "from":0,
                                        "size":20
        
                                    }
                                }
                            }).then(function (result) {
                                console.log('Promote Result',result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    resolve();
                                } else {
        
                                    $scope.promoteProducts = $scope.promoteProducts.concat(result.data.resolve);
                                    console.log('Promote Product',$scope.promoteProducts);
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
                    $scope.product_init = function(company_type) {
                        var query={
                                    "bool": {
                                        "must": [
                                            {
                                                "match":{"company_recommend":1}
                                            },
                                            {"match":{"status":"1"}}
                                        ],
                                        "filter": [
                                        ]
                                    }
                                };
                        var i;
                       angular.forEach(company_type,function(item,index){
                          query['bool']['filter'].push({
                              "term":{"company_type":item}
                          });
                       });
        
                        return new Promise(function (resolve, reject) {
        
        
                             $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "company",
                                    "body": {
                                        "_source" : ["nid", "title"],
                                        "query":query
                                    }
                                }
                            }).then(function (result) {
                                console.log(result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    resolve();
                                } else {
                                    data = result.data.resolve;
                                    i=0;
                                    console.log('Promoted Company',data);
        
                                    for (i=0;i<5;i++) {
                                        var rand = Math.floor(Math.random() * data.length);
                                        var title = data[rand]['title'];
                                        var query={
                                            "bool":{
                                                "should":[]
                                            }
                                        };
                                        query['bool']['should'].push({
                                            "match":{ "product_company":title}
                                        });
                                    }
        
                                     $scope.loadProduct(query).then(function(){
                                       resolve();
                                    });
                                }
        
                            });
                        });
                    }
                    $scope.init = function(company_type) {
                        var query={
                                    "bool": {
                                        "must": [
                                            {
                                                "match":{"company_recommend":1}
                                            },
                                            {"match":{"status":"1"}}
                                        ],
                                        "filter": [
                                        ]
                                    }
                                };
                        var i;
                       angular.forEach(company_type,function(item,index){
                          query['bool']['filter'].push({
                              "term":{"company_type":item}
                          });
                       });
        
                        return new Promise(function (resolve, reject) {
        
        
                             $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "company",
                                    "body": {
                                        "_source" : ["nid", "title"],
                                        "query":query
                                    }
                                }
                            }).then(function (result) {
                                console.log(result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    resolve();
                                } else {
                                    data = result.data.resolve;
                                    i=0;
                                    console.log('Promoted Company',data);
        
                                    for (i=0;i<5;i++) {
                                        var rand = Math.floor(Math.random() * data.length);
                                        var title = data[rand]['title'];
                                        var query={
                                            "bool":{
                                                "should":[]
                                            }
                                        };
                                        query['bool']['should'].push({
                                            "match":{ "product_company":title}
                                        });
                                    }
        
                                     $scope.loadProduct(query).then(function(){
                                       resolve();
                                    });
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
            return metalPromoteProduct;
        }); 
 
 
 
 
//   });
// })(jQuery);
 



//});