var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorContainerElement/element.html";
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            console.log('editorContainerElement loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
                console.log('editorContainerElement loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            console.log('editorContainerElement init end');
            $scope.id = $element.attr('id') || "con" + new Date().getTime();
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                console.log('editorContainerElement new element');

                if (!$.trim($element.html())) {
                    console.log("hi");
                } else {
                    console.log('hi2');
                }

                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "html": '<div>container</div>',
                    "type": "editor-container-element"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            console.log('editorContainerElement init end');
        }
    };
    return editorContainerElement;
});
