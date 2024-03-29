var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
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
            $scope.$watch(function () {
                return $scope.model.html
            }, function () {
                $scope.model.html = $element.html();
                console.log('changed');
            });
            setInterval(function () {
                console.log('container html', $scope.model.html);
            }, 3000);
        }
    };
    return editorContainer;
});