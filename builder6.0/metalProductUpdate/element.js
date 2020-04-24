var app = angular.module('demoApp');
app.directive('metalProductUpdate', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalProductUpdate';
    var link = {
        restrict: 'E',
        scope: true,
//        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalProductUpdate/element.html?id=" + new Date().getTime(),
        templateUrl:"https://d27btag9kamoke.cloudfront.net/builder6.0/metalProductUpdate/element.html?id=" + new Date().getTime(),

         link: function (scope, element, attrs) {
            // var user = store.get('user');
            // if (!angular.isUndefined(user)) {
            //         scope.inited = true;                    
            // }
            // else
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.model ={};
            
            $scope.featureProducts = [];
            $scope.relatedProducts = [];
            
           $scope.load = function(){
               

               var path = location.pathname.split("/");
                var nid = path[path.length-1];
                console.log('Product Init',nid);
                    console.log('Metal Product Init');
                    $dazzleUser.dazzleInfo['editType'] ="product";
    
                      $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "getData",
                                "index": "5metal.dazzle.website",
                                "type": "product",
                                "id": nid
                            }
                        }).then(function (result) {
                            console.log('Product',result);
                            if (result.data.code < 0) {
                                $scope.model ={};
                            } else {
                                    $scope.model = result.data.resolve;
                                    $scope.addView();
                                    $scope.currentImg = $scope.model['images'][0];
                                    $dazzleUser.dazzleInfo['product_id']=$scope.model['nid'];
                                    $dazzleUser.dazzleInfo['item']  = $scope.model;
                                    $scope.loadRelatedProduct($scope.model['company_id']);
                                    $scope.loadCompany();
                            }
                        });                    
          
               
               
           } 
           
            
            $scope.product_init = function(nid){
                console.log('Product Init',nid);
                if (!nid) {
                    
                    $http({
            			"method": "post",
            			"url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            			"data":{
            				"action": "getCount",
            				"index": "5metal.dazzle.website",
            				"type": "product"
            			}
            		}).then(function (result) { 
                            $scope.product_count = result.data.resolve['count'];
                            console.log('Product Count',$scope.product_count);
                            nid = 40000 + parseInt($scope.product_count)+1;
                            
                            $scope.model = store.get('newItem');
                            $scope.model['nid'] = nid;
                            console.log('new Item',$scope.model);
                            
                            
                            $scope.addProduct(nid,$scope.model).then(function(){
                                $scope.currentImg = $scope.model['images'][0];
                                $dazzleUser.dazzleInfo['product_id']=$scope.model['nid'];
                                $dazzleUser.dazzleInfo['item']  = $scope.model;
                                $scope.loadRelatedProduct($scope.model['company_id']);
                                $scope.loadCompany();                                
                            });

    
            		});
                    
                    
                } else {
                    console.log('Metal Product Init');
                    $dazzleUser.dazzleInfo['editType'] ="product";
    
                      $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "getData",
                                "index": "5metal.dazzle.website",
                                "type": "product",
                                "id": nid
                            }
                        }).then(function (result) {
                            console.log('Product',result);
                            if (result.data.code < 0) {
                                $scope.model ={};
                                
                                
    //                            resolve({});
                            } else {
                                    $scope.model = result.data.resolve;
                                    $scope.addView();
                                    $scope.currentImg = $scope.model['images'][0];
                                    $dazzleUser.dazzleInfo['product_id']=$scope.model['nid'];
                                    $dazzleUser.dazzleInfo['item']  = $scope.model;
                                    $scope.loadRelatedProduct($scope.model['company_id']);
                                    $scope.loadCompany();
                            }
                        });                    
                }

                    

            }

             $scope.init = function(nid){
                console.log('Product Init',nid);
                if (!nid) {
                    
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "getCount",
                            "index": "5metal.dazzle.website",
                            "type": "product"
                        }
                    }).then(function (result) { 
                            $scope.product_count = result.data.resolve['count'];
                            console.log('Product Count',$scope.product_count);
                            nid = 40000 + parseInt($scope.product_count)+1;
                            
                            $scope.model = store.get('newItem');
                            $scope.model['nid'] = nid;
                            console.log('new Item',$scope.model);
                            
                            
                            $scope.addProduct(nid,$scope.model).then(function(){
                                $scope.currentImg = $scope.model['images'][0];
                                $dazzleUser.dazzleInfo['product_id']=$scope.model['nid'];
                                $dazzleUser.dazzleInfo['item']  = $scope.model;
                                $scope.loadRelatedProduct($scope.model['company_id']);
                                $scope.loadCompany();                                
                            });

    
                    });
                    
                    
                } else {
                    console.log('Metal Product Init');
                    $dazzleUser.dazzleInfo['editType'] ="product";
    
                      $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "getData",
                                "index": "5metal.dazzle.website",
                                "type": "product",
                                "id": nid
                            }
                        }).then(function (result) {
                            console.log('Product',result);
                            if (result.data.code < 0) {
                                $scope.model ={};
                                
                                
    //                            resolve({});
                            } else {
                                    $scope.model = result.data.resolve;
                                    $scope.addView();
                                    $scope.currentImg = $scope.model['images'][0];
                                    $dazzleUser.dazzleInfo['product_id']=$scope.model['nid'];
                                    $dazzleUser.dazzleInfo['item']  = $scope.model;
                                    $scope.loadRelatedProduct($scope.model['company_id']);
                                    $scope.loadCompany();
                            }
                        });                    
                }

                    

            }
            
            $scope.delete = function(nid){
                  $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "deleteData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id":nid
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                                alert('刪除失敗');
                        } else {
                                alert('刪除成功');
                        }
                    });               
            }
             $scope.returnPrice = function(item){
                        if (item['product_price'])
                            return "$"+item['product_price'];
                        else
                            return "按此查詢";
                    }
            $scope.addView = function(){
                var noView = parseInt($scope.model['product_views']);
                noView ++;
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id":$scope.model['nid'],
                            "body": {
                                "doc": {
                                    'product_views': noView
                                }
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Product View Unsuccess');
                        } else {
                            console.log('Product View Success');
                        }
                    });               
                
            }
             $scope.loadImage = function(images) {
                var img; 
                 
                if (Array.isArray(images))
                    img= images[0];
                else
                    img=images;
                    
               img = img.replace("Product#",""); 
                
                return img;
                 
             }
            $scope.loadCompany = function(){
                   $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": $scope.model['company_id'] 
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {

                        } else {
                                $scope.company = result.data.resolve;
                                
                                console.log('Company',$scope.company);

                        }
                    });         
            }
            $scope.loadRelatedProduct = function(company_id){
  
                  $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "body":{
                                "query":{
                                    "match":{
                                        "company_id":company_id
                                    }
                                }
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {

                        } else {
                                $scope.relatedProducts = result.data.resolve;
                                $scope.featureProducts = result.data.resolve;
                                

                        }
                    });              
            }
            $scope.loadFeatureProduct = function(category){
                
                
                
            }
            
            
            $scope.isUser = function(){
                var user= store.get('subUser');

                if (angular.isUndefined(user)) {
                   // console.log('No UID');
                    return false;                    
                } else if (user){
                    var uid = user.uid;                    
                } else
                    return false;

                        
                if (uid=="1" || uid=="162")
                  return true;                    
            
                if($scope.model['uid'] ==uid)
                    return true;

    
            }
            $scope.isAdmin = function(){
                var user = store.get('subUser');
                console.log('Is Admin?',user);

                if (!angular.isUndefined(user) || user['uid']==162)
                    return true;
                else
                    return false;
            }
            $scope.loadBigImage = function(img){
                
                console.log('Load Big');
                img = img.replace("product_list","img_large");
                img = img.replace("Product#","");
                $scope.currentImg = img;
            }
            $scope.loadThumbnailImage = function(img){
                img = img.replace("product_list","inner_small_img");
                img = img.replace("Product#","");
                return img;
                
            }
            $scope.save = function() {
                console.log(JSON.stringify({
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id":$scope.model['nid'],
                            "body": {
                                "doc":$scope.model    
                            }
                        }));
                $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id":$scope.model['nid'],
                            "body": {
                                "doc": {
                                    'title': $scope.model['title']
                                }
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
//                            resolve({});
                        } else {
                            alert('成功更新');
                        }
                    });
                
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

app.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() {
                return (parsed(scope) || '').toString();
            }

            // Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  // The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }
    }
});