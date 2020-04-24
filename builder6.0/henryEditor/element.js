var app = angular.module('demoApp');
var name ="henryEditor";
app.directive(name, function ($compile, $timeout,  $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup, $ocLazyLoad) {


    var metalCategory = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
         compile: function (tElem, tAttrs) {
           return {
               pre: function (scope, iElem, iAttrs) {
          
               },
               post: function (scope, iElem, iAttrs) {
               }
           }
       },
        link: function ($scope, $element, attrs) {
                


        },
        
        controller: function ($scope, $http, $element) {
        
        }
    };
    return metalCategory;
}); 
 
 
 