var app = angular.module('demoApp');
//require(['store'],function(store){
// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
        app.directive('metalEditorHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var metalEditorHeader = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalEditorHeader/element.html?id=" + new Date().getTime(),
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
                        
                        
                        
                        $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "getData",
                                    "index": "5metal.dazzle.website",
                                    "type": "company",
                                    "id": "31771"
                                }
                            }).then(function (result) {
                                //console.log(result);
                                if (result.data.code < 0) {
                                    console.log('Unsuccess');
                                } else {
                                    console.log('Company Success');
                                    $scope.company = result.data.resolve;
                                }
        
                            });
                        
                        
                    }
                    
                }
            };
            return metalEditorHeader;
        }); 
 
 
 
 
//   });
// })(jQuery);
 



//});