var app = angular.module('demoApp');

// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
      
app.directive('panel', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,
    $dazzlePopup,pageInfo,hotkeys,atomInfo,dzFn,userInfo,dzS3,atomInfo) {
    var dzOverlay = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/panel/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {
     //      console.log(': compile');
     //      console.log(tElem.html());
           return {
               pre: function ($scope, $element, iAttrs) {

                        
                    $dazzleUser.dazzleInfo['editEle'] = $dazzleUser.dazzleInfo['overlayEle'];
                    $dazzleUser.dazzleInfo['isEdit'] = true;
//                    $element.append("<dazzle-toolbar></dazzle-toolbar");
                    $element.find('img').attr('dz-image','');
//                    $compile($element.contents())($scope);
                    $('dz-overlay').remove();
                    $dazzleUser.dazzleInfo['addPanel'] = false;

               },
               post: function ($scope, $element, iAttrs) {
      
               }
           }
       },
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzOverlay";
            scope.type = "dzOverlay";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
               scope.$on('$destroy', function() {
                console.log("destroy");
                var panelId = $dazzleUser.dazzleInfo['panelId']; 
                  dzS3.saveAtomById(panelId,element.find('dz-text').html());  
              });

        },
        controller: function ($scope, $element, $attrs) {
            
      
        }
    };
    return dzOverlay;
});



// }
// })