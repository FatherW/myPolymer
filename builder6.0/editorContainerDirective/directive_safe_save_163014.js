var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container",
                    "html": '<div>container</div>'
                };
            }
            $scope.contentEdited = function () {
                console.log('editorContainer:contentEdited');
            };
            $scope.model = $scope.atom[$scope.id];
            $scope.watch('model.html', function () {
                console.log('editorContainer:changed');
            });
            setTimeout(function () {
                console.log('hi')
                $scope.$apply(function () {
                    $scope.model.html += "1231233213213333";
                });
            },2000)
        }
    };
    return editorContainer;
});