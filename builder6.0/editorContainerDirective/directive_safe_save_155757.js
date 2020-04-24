var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html" ng-model="model.html"></div>',
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
            $scope.contentEdited = function () {
                console.log('editorContainer contentEdited');
            };
            $scope.compile = function () {
                console.log($element.html());
            }
            $scope.model = $scope.atom[$scope.id];
        }
    };
    return editorContainer;
});