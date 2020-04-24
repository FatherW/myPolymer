var app = angular.module('demoApp');
app.directive('qsdad', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/qsdad/html/id-1490581616054.html";
    var qsdad = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('qsdad loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('qsdad loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('qsdad init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-qsdad-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>qsdad</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            console.log('name');
            //console.log('qsdad init end');
        }
    };
    return qsdad;
});