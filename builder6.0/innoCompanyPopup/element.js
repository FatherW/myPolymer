var app = angular.module('demoApp');
app.directive('innoCompanyPopup', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/innoCompanyPopup/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/innoCompanyPopup/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {

        },
        controller: function ($scope, $element, $attrs) {
              

        }
    };
    return dzLink;
});