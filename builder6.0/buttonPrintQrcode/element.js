var app = angular.module('demoApp');
app.directive('buttonQrcodeManager', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn) {
    var name = 'buttonQrcodeManager';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/buttonQrcodeManager/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.load= function() {
                
                console.log('hello');
                
            }
            
        }
    };
    return link;
});