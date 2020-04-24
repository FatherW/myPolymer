var app = angular.module('demoApp');
app.directive('jitpoLogin', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn) {
    var name = 'jitpoLogin';
    var link = {
        restrict: 'EA',
        require: ['^dzLogin', 'jitpoLogin'],
        scope:  true,
         link: function ($scope, $element, attrs,ctrls) {
            var dzLogin = ctrls[0];
            var jitpoLogin = ctrls[1];

            $scope.login = function(){
                dzLogin.login().then(function(result){
                    location.href = "user-area.html";
                });                
            }



        },        
        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {


        }
    };
    return link;
});
  

