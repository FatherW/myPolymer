var app = angular.module('demoApp');
app.directive('innoRelatedEvent', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'innoRelatedEvent';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

   
        }
    };
    return link;
});




