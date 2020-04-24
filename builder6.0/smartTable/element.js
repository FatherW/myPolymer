var app = angular.module('demoApp');
app.directive('smartTable', function ($compile, $templateRequest) {
    var http = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var path = "builder6.0/smartTable/";
    var directiveName = "smartTable";
    var smartTable = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('smartTable loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('smartTable loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('smartTable init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-smartTable-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>smartTable</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('smartTable init end');

            $scope.getRealHtml = function () {
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/smartTable/html/template.html" + "?id" + new Date().getTime()).then(function (html) {
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
            };

            $scope.init = function () {
                $scope.getRealHtml();
            }();
        
        }
    };
    return smartTable;
});