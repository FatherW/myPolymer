var app = angular.module('demoApp');
var uid = "www.rainbowcu.org.hk"; 
var user = store.get('rainbow-user');

app.directive('dzSuccessOrder', function ($compile,$http, $templateRequest,  $mdDialog,$dazzlePopup,$dazzleUser,$http,$dazzleElastic, $dazzleFn,$dazzleData,$ocLazyLoad) {
    var dzSuccessOrder = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzSuccessOrder/element.html?id=" + new Date().getTime(),
        link:  {

            pre: function(scope,element,attr){
                

            },
            
            post: function(scope,element,attr){


            }
            

            
        },
        controller: function ($scope, $element, $attrs) {

		}
    };
    return dzSuccessOrder;
});