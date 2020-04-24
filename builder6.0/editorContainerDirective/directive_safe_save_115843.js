var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (element) {
            console.log(element.html());
        },
        compile: function (element) {
            console.log(element.html());
            return {
                pre: function (scope, element, attrs) {
                    console.log(element.html());
                },
                post: function (scope, element, attrs) {
                    console.log(element.html());
                }
            }
        },
        controller: function ($scope, $element) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container"
                };
            }
            $scope.model = $scope.atom[$scope.id];
        }
    };
    return editorContainer;
});