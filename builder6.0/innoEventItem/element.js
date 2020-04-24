var app = angular.module('demoApp');
app.directive('innoEventItem', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'innoEventItem';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoEventItem/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.imagePath = "http://www.innoaibator.com/images/grey.png";
            $scope.event = {
               'tags':["hello","hello2"]  
            };
   
        }
    };
    return link;
});




