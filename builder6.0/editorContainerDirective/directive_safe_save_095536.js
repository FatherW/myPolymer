var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<editor-html-directive ng-bind-html="containerHtml | to_trusted"></editor-html-directive>',
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
            $scope.containerHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
        }
    };
    return editorContainer;
});