var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('foreverTab', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory,pageInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/foreverTab/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/foreverTab/element.css?id=" + new Date().getTime(),
          preload: true
        },
        link: function ($scope, $element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   
                var myTab = pageInfo.thisPage.replace(".html","");
                
//                class="ui-tabs-active ui-state-active"
                $element.find('li').each(function(){
                    console.log('This',$(this));
                   var text = $(this).children('a').text();
                   text = text.trim();
                   console.log('Text',text);
                   if (text == myTab){
                        console.log(text);
                        $(this).attr('class',"ui-tabs-active ui-state-active");
                        $element.find('button').html(text+'<i class="fa fa-caret-down" aria-hidden="true" id="fa_fa-caret-down"></i>');
                   }
                });               

        },
        controller: function ($scope, $element, $attrs) {
  
        }
    };
    return dzSlider;
});

