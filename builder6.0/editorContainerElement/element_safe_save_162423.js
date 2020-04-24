var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorContainerElement/element.html";
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('editorContainerElement loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('editorContainerElement loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('editorContainerElement init start');
            $scope.id = $element.attr('id') || "con" + new Date().getTime();
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-container-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>container</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('editorContainerElement init end');
        }
    };
    return editorContainerElement;
});