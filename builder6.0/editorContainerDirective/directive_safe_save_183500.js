var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            element.unbind('DOMSubtreeModified').bind('DOMSubtreeModified', function () {
                console.log('container html changed',$scope.model.html);
            });
        },
        controller: function ($scope, $element) {
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "html": "<div>helloworld</div>"
                    "type": "editor-container"
                };
            }
            $scope.model = $scope.atom[$scope.id];
        }
    };
    return editorContainer;
});