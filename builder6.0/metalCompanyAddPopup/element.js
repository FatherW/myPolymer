var app = angular.module('demoApp');
var states={
  value: [],
  display:[]
};
app.controller('DemoCtrl', DemoCtrl);
app.directive('metalCompanyAddPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit,$q,$log,$timeout,$http) {
    var name = 'metalCompanyAddPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCompanyAddPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "metalCompanyAddPopup";
            scope.type = "metalCompanyAddPopup";
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
                $scope.model = {};  
                
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
