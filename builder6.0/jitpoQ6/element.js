var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ6', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/jitpoQ6/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ6/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
        


        },
        controller: function ($scope, $element, $attrs) {
            $scope.noTab = 0;
            $scope.tab = [];
            $scope.ans = [
                {
                    "title":"個人性格特質",
                    "ans":[]
                },
                {
                    "title":"身心健康方面",
                    "ans":[]
                },
                {
                    "title":"休閒、娛樂方面",
                    "ans":[]
                },
                {
                    "title":"信仰、文化、人生智慧、價值觀方面",
                    "ans":[]
                },
                {
                    "title":"人際關係、溝通、相處技巧方面",
                    "ans":[]
                },
                {
                    "title":"教育、職業、技能方面",
                    "ans":[]
                },
                {
                    "title":"經濟、資產方面",
                    "ans":[]
                },

                {
                    "title":"家居、生活環境方面",
                    "ans":[]
                }

                
                
                
            ];
            
            

        }
    };
    return dzSlider;
});

