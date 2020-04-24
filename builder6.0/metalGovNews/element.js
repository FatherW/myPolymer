var app = angular.module('demoApp');
app.directive('metalGovNews', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalGovNews';
    var link = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalGovNews/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {
            // var user = store.get('user');
            // if (!angular.isUndefined(user)) {
            //         scope.inited = true;                    
            // }
            // else
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

        }
    };
    return link;
});