var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            scope.id = element[0].id || "con" + new Date().getTime();
            element[0].id = scope.id;
            if (angular.isUndefined(scope.atom[scope.id])) {
                scope.atom[scope.id] = {
                    "id": scope.id,
                    "type": "editor-container",
                    "html": element.html()
                };
            }
            console.log(scope.model);
        },
        controller: function ($scope, $element) {

            //$scope.model = $scope.atom[$scope.id];
            //$scope.model.html = $element.html();
        }
    };
    return editorContainer;
});