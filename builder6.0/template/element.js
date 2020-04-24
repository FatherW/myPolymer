var app = angular.module('demoApp');
app.directive('template', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/template/";
    var directiveName = "template";
    var template = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('template loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('template loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('template init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-template-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>template</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('template init end');

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
    return template;
});