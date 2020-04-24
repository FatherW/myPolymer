var app = angular.module('demoApp');

// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
      
app.directive('dzToolbar', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,
    $dazzlePopup,$dazzleData,$dazzleFn,panelInfo,atomInfo,dzFn,dzMenu,hotkeys) {
    var dzToolbar = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzToolbar/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {
     //      console.log(': compile');
     //      console.log(tElem.html());
           return {
               pre: function ($scope, iElem, iAttrs) {
                    var ele = $dazzleUser.dazzleInfo['panelEle'];
                    var size = $dazzleUser.dazzleInfo['panelSize'];
                    var pos = $dazzleUser.dazzleInfo['panelButtonPos']; 
                    iElem.css('position','absolute');
                    iElem.css('top',pos[1]+30);
                    iElem.css('left',pos[0]+30);

               },
               post: function ($scope, iElem, iAttrs) {
         //          console.log(': post link');
                  // $compile(iElem)(scope);
                  
                
               }
           }
       },
        link: function (scope, element, attrs) {
        

        },
        controller: function ($scope, $element, $attrs) {
                var ele = $dazzleUser.dazzleInfo['panelEle'];
                var tagName = ele[0].tagName;
                var icon;
                switch(tagName){
                    case 'IMG':
                        icon = 'fa-image';
                        $scope.funcs = ['update','edit','link','data','remove'];
                        break;
                        
                    case 'A':
                        icon="fa-link";
                        $scope.funcs = ['edit','cancel','import','data'];

                        break;
                    
                    case 'FORM':
                        icon = "fa-clipboard-list";
                        $scope.funcs = ['settings','data'];
                        break;
                        
                    case 'INPUT':
                    case 'TEXTAREA':
                        icon = "fa-tasks";
                        
                        break;
                    case 'DIV':
                        icon="fa-th-large";
                        $scope.funcs = ['edit','code','copy-up','copy-down','background','remove'];

                        break;
                    
                    default:
                        icon = "fa-keyboard";
                        $scope.funcs = ['edit','code','copy-up','copy-down','background','remove'];

                        break;
                    
                }
                
                $scope.triggerIcon = icon;
                
                
            $scope.getIcon = function(name){
                var icon="";
                switch(name){
                  
                    case 'import':
                        icon = "fa-file-import";
                        break;
                    case 'data':
                        icon = "fa-database";
                        break;
                    case 'link':
                        icon = "fa-link";
                        break;
                    case 'settings':
                        icon = "fa-cog";                                            
                        break;
                        
                    case 'cancel':
                        icon="fa-unlink";
                        break;
                    case 'edit':
                        icon = "fa-edit";
                        break;
                    case 'code':
                        icon = "fa-code";
                        break;
                    
                    case 'copy-up':
                        icon = "fa-caret-square-up";
                        break;
                    case 'copy-down':
                        icon = "fa-caret-square-down";
                        break;
                    case 'background':
                        icon = "fa-image";
                        break;
                    
                    case 'remove':
                        icon = "fa-times-circle";
                        break;
                    
                    
                }
                return icon;
                
            }
            $scope.getTriggerIcon = function(){
                
                return $scope.triggerIcon;
            }
           
        }
    };
    return dzToolbar;
});



// }
// })