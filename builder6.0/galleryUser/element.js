var app = angular.module('demoApp');
//require(['store'],function(store){
jQuery.noConflict();
(function( $ ) {
  $(function() {
        app.directive('galleryUser', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var galleryUser = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/galleryUser/element.html?id=" + new Date().getTime(),
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
                    $scope.login = function(){
                        var params = {
                            name: 'galleryLoginPopup',
                            directive: '<gallery-login-popup></gallery-login-popup>',
                            width:"200px",
                            height:"600px"
                        };
                        $dazzlePopup.callPopup(params).then(function(user){
                           console.log(user); 
                        });
                        
                    }
                    $scope.register = function() {
                        console.log('Register');
                    }
                    
                }
            };
            return galleryUser;
        }); 
 
 
 
 
  });
})(jQuery);
 



//});