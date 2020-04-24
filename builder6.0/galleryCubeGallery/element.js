var app = angular.module('demoApp');
//require(['store'],function(store){
jQuery.noConflict();
(function( $ ) {
  $(function() {
        app.directive('galleryCubeGallery', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var galleryCubeGallery = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/galleryCubeGallery/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                    
                    $scope.isAdmin = function(){
                        return false;
                    }

                    $scope.init = function() {
                        var filename = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
                        
                        $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
                        $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                        $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                        $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');

                        $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                        $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
                        $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
        
                        $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                        
                        
                    }
                    $scope.userGalleryAngularGridOptions = {
                        gridWidth: 250,
                        gutterSize: 6,
                        infiniteScrollDelay: 1000,
                        infiniteScrollDistance: 95,
                        scrollContainer: '#dialogContent_gallery'
                    };
                    
                    $scope.init = function(){
                        $scope.loadImages().then(function(data){
                            console.log('Data',data);
                            $scope.$apply(function () {
                                   $scope.pics = data;  
                            });

                           console.log($scope.pics);
                        });
                    }
                    
                    $scope.loadImages =  function(){
                
                        return new Promise(function (resolve, reject) {
                
                            console.log('Gallery Init');
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data":{
                                    "action": "searchData",
                                    "index": "beta.dazzle.gallery",
                                    "type": "item",
                                    "body": {
                                        "query":{
                                            "match":{
                                                "type":"3D模型"
                                            }
                                        }
                                    }
                
                                }
                            }).then(function (result) {
                                console.log(result);
                                if (result.data.code < 0) {
                                    resolve([]);
                                } else {
                                    resolve(result.data.resolve);
                                }
                            });
                        });
                    };
                }
            };
            return galleryCubeGallery;
        }); 
 
 
 
 
  });
})(jQuery);
 



//});