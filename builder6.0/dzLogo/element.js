var app = angular.module('demoApp');
                console.log('dz New Dataset');

app.directive('dzLogo', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzlePopup,$ocLazyLoad,
    dzFn,atomInfo,userInfo,dbFactory,pageInfo,dzS3) {
    var name='dzLogo';
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        // css: {
        //   href: "//d27btag9kamoke.cloudfront.net/builder6.0/innoCompany/element.css?id=" + new Date().getTime(),
        //   preload: true
        // },
             compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                 
                
                
                },
                post : function($scope, $element, attribute){
                 
                     
                }
            };
        },    
       
        controller: function ($scope, $element, $attrs) {
            

        }
    };
    return dzLink;
});