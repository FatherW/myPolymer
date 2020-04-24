var app = angular.module('demoApp');
app.directive('metalInfo', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalInfo';
    var link = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalInfo/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {
        
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

        }
    };
    return link;
});