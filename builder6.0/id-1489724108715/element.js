var app = angular.module('demoApp');
app.directive('asdasd', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1489724108715/html/id-1489724108715.html";
    var asdasd = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('asdasd loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('asdasd loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('asdasd init start');
            $scope.id = $element.attr('id') || "con" + new Date().getTime();
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-asdasd-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>container</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('asdasd init end');
        }
    };
    return asdasd;
});