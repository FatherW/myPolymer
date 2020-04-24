var app = angular.module('demoApp');
app.directive('dazzlebent', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/dazzlebent/";
    var directiveName = "dazzlebent";
    var dazzlebent = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('dazzlebent loading start');
            $templateRequest(http + path + "html/" + directiveName + ".html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('dazzlebent loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('dazzlebent init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-dazzlebent-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>dazzlebent</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            $templateRequest(http + path + "html/template.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                $compile(template)($scope);
                setTimeout(function () {
                    $scope.model.html = template[0].outerHTML;
                }, 500);
            });
            //console.log('dazzlebent init end');
        }
    };
    return dazzlebent;
});