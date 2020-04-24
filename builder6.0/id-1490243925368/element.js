var app = angular.module('demoApp');
app.directive('kpleeTest', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1490243925368/html/id-1490243925368.html";
    var kpleeTest = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeTest loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('kpleeTest loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('kpleeTest init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-kpleeTest-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeTest</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeTest init end');
        }
    };
    return kpleeTest;
});