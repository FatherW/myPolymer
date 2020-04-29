var app = angular.module('demoApp');
app.directive('dazzleLogin', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1490457698593/html/id-1490457698593.html";
    var DazzleLogin = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('DazzleLogin loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('DazzleLogin loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('DazzleLogin init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-DazzleLogin-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>DazzleLogin</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('DazzleLogin init end');
        }
    };
    return DazzleLogin;
});