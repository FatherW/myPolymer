var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ4', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/jitpoQ4/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ4/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
        


        },
        controller: function ($scope, $element, $attrs) {
            $scope.noTab = 0;
            $scope.tab = [];
            $scope.ans = [
                {
                    "title":"一些我做了會令我感覺良好的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                {
                    "title":"一些我做了會令我的人生更有意義的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                {
                    "title":"一些我做了會令我引以自豪的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                {
                    "title":"一些我平日享受做的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                {
                    "title":"當我感覺不快時能夠令我重新感覺良好的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                {
                    "title":"在我生命中最重要的事",
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                
                
                
            ];
            
            

        }
    };
    return dzSlider;
});

