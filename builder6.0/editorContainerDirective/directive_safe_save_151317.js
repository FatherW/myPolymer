var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div contenteditable="true" editable ng-bind-html="model.html | to_trusted" ng-model="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container",
                    "html": '<div>container</div><editor-image-element></editor-image-element>'
                };
            }
            $scope.model = $scope.atom[$scope.id];
        }
    };
    return editorContainer;
});