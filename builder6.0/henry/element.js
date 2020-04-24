var app = angular.module('demoApp');

var name = 'henry';
        app.directive('henry', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData,$dazzleFn, $dazzleUser, $dazzlePopup,$dazzleInit,$dazzleElastic,hotkeys,pageInfo,dzFn,dzS3){
            var link = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/henry/element.html?id=" + new Date().getTime(),
                css: {
                  href: "//d27btag9kamoke.cloudfront.net/builder6.0/henry/element.css?id=" + new Date().getTime(),
                  /* Preload: this will trigger an HTTP request on app load.
                   * Once the stylesheet is added, it will be loaded from the browser cache */
                  preload: true
                },
                
                controller: function ($scope, $http, $element) {
                }
            };
            return link;
        }); 



 

