var app = angular.module('demoApp');
app.directive('metalAdminButton', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalAdminButton';
    var link = {
        restrict: 'E',
        scope:  {
           'popup': '@popup',
           'item': '=',
           'field':'@field'
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalAdminButton/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
           var user= store.get('subUser') || null;
            if (user && user['uid'] ==162)
                $scope.isAdmin = true;
            else
                $scope.isAdmin = false;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

        }
    };
    return link;
});