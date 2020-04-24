var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('innoMenu', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/innoMenu/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/innoMenu/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
         
                $scope.width = $(window).width();
                $scope.mobileShow = false;
                if ($scope.width<640)
                    $scope.isMobile = true;
                else 
                    $scope.isMobile = false;
//                $scope.class = "type_desktop";
//                $scope.isMobile = false;

        $(document).ready(function(){

                 $scope.width = $(window).width();
        
                    if ($scope.width<640){
                       $('.grid').attr('style','');
                       $('.grid__item').attr('style','');
        
                    }            
        });
             $(window).resize(function() {
            

                 $scope.width = $(window).width();
        
                 // manuall $digest required as resize event
                 // is outside of angular
                    if ($scope.width<640){
//                        $scope.class = "type_mobile";
                       $('.grid').attr('style','');
                       $('.grid__item').attr('style','');
            
            
                        $scope.isMobile = true;
                        $('.w-nav').removeClass('type_desktop').addClass('type_mobile');
                        console.log('Is Mobile',$scope.width);
//                        $scope.$apply();
                    }
                    else {
  //                      $scope.class = "type_desktop";
                        $scope.isMobile = false;
                        $('.w-nav').removeClass('type_mobile').addClass('type_desktop');

                        console.log('Is Not Mobile',$scope.width);
//                        $scope.$apply();
                        
                    }

               });


        },
        controller: function ($scope, $element, $attrs) {
            $scope.myClass = function(){
                if ($scope.isMobile)
                    return 'type_mobile';
                else
                    return 'type_desktop';
            }
            $scope.isShow = function(){
                if (!$scope.isMobile)
                    return true;
                else
                    return $scope.mobileShow;
            }
            $scope.myMenuClass = function(){
                if ($scope.isMobile && !$scope.mobileShow)
                    return 'mobile_hide';
                else
                    return 'mobile_show';
            }
            $scope.mobileClick= function(){
                    $scope.mobileShow = !$scope.mobileShow;
            }
        }
    };
    return dzSlider;
});

