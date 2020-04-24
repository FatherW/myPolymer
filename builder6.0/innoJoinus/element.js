var app = angular.module('demoApp');
app.directive('innoJoinus', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,  $dazzlePopup, $ocLazyLoad) {
    var name = 'innoJoinus';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoJoinus/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
             $scope.user = store.get('subUser') || null;
             console.log('is User',$scope.user);
            $scope.isUser = function(){
                if ($scope.user !=null)
                    return true;
                else
                    return false;
            }
             
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
         


        }
    };
    return link;
});




