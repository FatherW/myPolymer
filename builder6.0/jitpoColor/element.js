var app = angular.module('demoApp');
app.directive('jitpoColor', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn,pageInfo) {
    var name = 'jitpoColor';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: _cdn+"builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.css?id=" + new Date().getTime(),
          preload: true
        },

         link: function ($scope, $element, attrs,ctrls) {
              var editMode = store.get('editMode') || 'normal';
                    if (editMode=='admin')
                        $scope.isAdmin = true;
                    else
                        $scope.isAdmin = false;
                        
                if (!$scope.isAdmin)
                   $ocLazyLoad.load(['https://code.jquery.com/jquery-1.12.4.js','https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css','https://code.jquery.com/ui/1.12.1/jquery-ui.js'], {cache: false}).then(function () {
                        $( "#menu" ).accordion({
                            active: false,
                            collapsible: true
                        });
                    },function(){
    
    				 });
    			else
    			    $( "#menu" ).accordion({
                            active: false,
                            collapsible: true
                        });
//
            
           
        },        
        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
         
         
          $scope.changeColor = function(id){
              $("#main-block").removeClass('color-set-1');
              $("#main-block").removeClass('color-set-2');
              $("#main-block").removeClass('color-set-3');
              $("#main-block").removeClass('color-set-4');
              $('#main-block').addClass('color-set-'+id);
              
          }

            $scope.go = function(url){
                location.href = url;
            }
        }
    };
    return link;
});
  

