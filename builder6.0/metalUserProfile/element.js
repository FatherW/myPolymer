var app = angular.module('demoApp');
app.directive('metalUserProfile', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalUserProfile';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserProfile/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
              var user = store.get('subUser');
               $scope.user = user;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
        

				     $scope.loadImage = function(images) {
                            var url;
                            if (Array.isArray(images))
                                url =  images[0];
                            else
                                url = images;
                               url = url.replace("Product#",""); 
            			    return url;
            			}
        }
    };
    return link;
});




