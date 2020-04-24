var app = angular.module('demoApp');
//require(['store'],function(store){
        app.directive('metalFrontCompanyBlock', function ($ocLazyLoad,$compile, $timeout, $mdDialog, $mdToast, $dazzleS3, $dazzleUser, $dazzlePopup) {
                   
        
            var metalFrontCompanyBlock = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalFrontCompanyBlock/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                   
                    console.log('Metal Promote Product');
                    $scope.companys = [];
                    $scope.getInit = function() {
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": "5metal.dazzle.website",
                                    "type": "company",
                                    "body": {
                                        "_source" : ["nid", "company_logo","title","company_views","company_type"],
                                            "query": {
                                                "function_score" : {
                                                  "query" : { "match_all": {} },
                                                  "random_score" : {}
                                                }
                                            }
                                    },
                                    "from":0,
                                    "size":40
                                }
                            }).then(function (result) {
                                console.log('Company Result',result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                    $scope.companys=[];
                                    resolve();
                                } else {
                                    $scope.companys = result.data.resolve;
                                //   setTimeout(function(){
                                //     	$(".home_row .grid_box .marquee_box5").kxbdMarquee({direction:"up" , scrollDelay:50});
                                //     },1000);

                                    resolve();
                                }
        
                            });
                        });
                    }
        
                    $scope.loadType = function(type){
                        var str='';
                        angular.forEach(type,function(item,index){
                           if (index != length-1)
                            str = str+item+",";
                           else
                            str = str + item;
                        });
                        return str;
                    }
        
                    $scope.loadImage = function(images) {
                        if (Array.isArray(images)) {
                            if (!images.length)
                                return "https://www.5metal.com.hk/sites/all/themes/metal/images/logo_company.jpg";                        
                            else
                                return images[0];
                            
                        }

                        else
                            return images;
                    }
                    
                }
            };
            return metalFrontCompanyBlock;
        }); 
 
 
 

//});