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

        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpyslider init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-ccpyslider-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpyslider</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpyslider init end');

            $scope.getFakeHtml = function () {
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpyslider/html/1490667602981.html" + "?id" + new Date().getTime()).then(function (html) {
                    var fakeTemplate = angular.element(html);
                    $compile(fakeTemplate)($scope);
                    setTimeout(function () {
                        $scope.model.html = fakeTemplate[0].outerHTML;
                    }, 500);
                });
            }();

            $scope.sliderJson = [];
            $scope.getFile($scope.userBucket, $scope.websiteKey + 'content/slider-data.json').then(function (slider) {
                $scope.sliderJson = $scope.sliderJson.concat(slider);
                console.log($scope.sliderJson);
            });

            $scope.getRealHtml = function () {
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpyslider/html/1490666715837.html" + "?id" + new Date().getTime()).then(function (html) {
                    var realTemplate = angular.element(html);
                    $compile(realTemplate)($scope);
                    setTimeout(function () {
                        $scope.model.realHtml = realTemplate[0].outerHTML
                            .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                            .replace(/<!--(.*?)-->/gm, "");
                        console.log($scope.model.realHtml);
                    }, 500);
                });
            }();
        }
    };
    return ccpyslider;
});