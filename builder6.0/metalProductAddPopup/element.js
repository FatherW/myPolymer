var app = angular.module('demoApp');
var states={
  value: [],
  display:[]
};
app.directive('metalProductAddPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit,$q,$log,$timeout,$http) {
    var name = 'metalProductAddPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalProductAddPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "metalProductAddPopup";
            scope.type = "metalProductAddPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

             
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                
                
            $scope.init = function(){
                var count;
                $scope.model = {};   
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "body": {
//                            "_source" : ["nid"],
                            "query":{
                                "match_all":{
                                }
                            }
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Error',result);   
//                        $mdDialog.hide();
                    } else {
                        count = result.data.resolve + 2000;
                        $scope.model['nid'] = count;
                    }
                });                
                //$scope.model['nid'] =                
            }    
             
            //$scope.save = 
             
             $scope.uploadPhoto = function() {
                        var params = {
                            'name':'metalGalleryPopup',
                            'directive':'<metal-gallery-popup></metal-gallery-popup>',
                            'images':[]
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            $scope.model['images'] = result;
                        });
             }
             
             $scope.viewSource = function(){
                 var source;
                 source = $('.editor').html();
                   var params = {
                          'name':'metalCodePopup',
                          'directive':'<metal-code-popup></metal-code-popup>',
                          'body':source
                        };

                        $dazzlePopup.callPopup(params).then(function(result){
                            $('.editor').html(result);
                            
                             $mdToast.show(
                              $mdToast.simple()
                                .textContent('內容已更新')
                                .position('top')
                                .hideDelay(3000)
                            );
                        });    
                 
             }
             $scope.selectCategory = function(){
                        var params = {
                          'name':'metalCategoryPopup',
                          'directive':'<metal-category-popup></metal-category-popup>',
                          'categories':[]
                        };
                        
                        $dazzlePopup.callPopup(params).then(function(result){
                            $scope.model['category'] = result;        
                        
                        });
                
             }
             
             
        }
    };
    return link;
});
