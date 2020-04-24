var app = angular.module('demoApp');
app.directive('ccpyslider', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/ccpyslider/html/id-1490665989949.html";
    var ccpyslider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpyslider loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpyslider loading end');
            });

            $scope.sliderJson = [{
                "title": "title",
                "caption": "caption",
                "button": "button",
                "link": "http://google.com/",
                "image": "http://www.themenesia.com/themeforest/archi-light/images-slider/wide1.jpg"
            }, {
                "title": "title2",
                "caption": "caption2",
                "button": "button2",
                "link": "http://google2.com/",
                "image": "http://www.themenesia.com/themeforest/archi-light/images-slider/wide2.jpg"
            }, {
                "title": "title3",
                "caption": "caption3",
                "button": "button3",
                "link": "http://google3.com/",
                "image": "http://www.themenesia.com/themeforest/archi-light/images-slider/wide3.jpg"
            }]

            $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpyslider/html/1490666715837.html" + "?id" + new Date().getTime()).then(function (html) {
                var realHtml = angular.element(html);
                $compile(realHtml)(scope);
                setTimeout(function () {
                    console.log(realHtml.html());
                }, 1000);
            });

        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpyslider init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-ccpyslider-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<br><br><br><br><br><br><br><br><br><br><br><br><div>ccpyslider</div><br><br><br><br><br><br>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpyslider init end');
        }
    };
    return ccpyslider;
});