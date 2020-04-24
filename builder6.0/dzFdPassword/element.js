
var app = angular.module('demoApp');
    app.directive('dzFdPassword', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3,  $dazzleUser, $dazzlePopup,
    dzFn,dzS3,dbFactory) {
         var name="dzFdPassword";
      var adminDashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
         

        },     
        controller: function($scope, $http, $element, $timeout, $ocLazyLoad,$mdSidenav) {
         

        }
      };
      return adminDashboard;
    });







//});