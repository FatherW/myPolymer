var app = angular.module('demoApp');
app.directive('dazzleYoutube', function ($compile, $templateRequest) {
    var http = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var path = "builder6.0/dazzleYoutube/";
    var directiveName = "dazzleYoutube";
    var dazzleYoutube = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('dazzleYoutube loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('dazzleYoutube loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('dazzleYoutube init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "url":  "http://www.youtube.com/embed/zpOULjyy-n8",
                    "type": "editor-dazzleYoutube-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>dazzleYoutube</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('dazzleYoutube init end');

            $scope.updateHtml = function () {
                //call this function if your html compiled by data and template
                $templateRequest(http + path + "html/template.html?id=" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = template[0].outerHTML
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");
                        });
                    }, 500);
                });
            }
        }
    };
    return dazzleYoutube;
});