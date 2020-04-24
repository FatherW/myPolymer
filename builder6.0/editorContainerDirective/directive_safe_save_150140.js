var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<div ng-bind-html="model.html | to_trusted"></div>',
        controller: function ($scope, $element) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container",
                    "html": "<div>container</div>"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.model.html = $element.html();
        }
    };
    return editorContainer;
});