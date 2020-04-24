var app = angular.module('demoApp');
app.directive('rainbowTab', function ($compile, $templateRequest,  $mdDialog,$dazzlePopup,$dazzleUser,$http,$dazzleElastic) {
    var rainbowTab = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/rainbowTab/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
   
            

            
        },
        controller: function ($scope, $element, $attrs) {


        }

    };
    return rainbowTab;
});