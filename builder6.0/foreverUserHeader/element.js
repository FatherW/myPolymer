var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('foreverUserHeader', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/foreverUserHeader/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/foreverUserHeader/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   


        },
        controller: function ($scope, $element, $attrs) {
                $scope.isLogin = function(){
                    return true;
                }
        }
    };
    return dzSlider;
});

