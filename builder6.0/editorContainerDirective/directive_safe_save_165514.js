var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        link: function (scope, element, attrs) {
            scope.id = element[0].id || "con" + new Date().getTime();
            element[0].id = scope.id;
            if (angular.isUndefined(scope.atom[scope.id])) {
                scope.atom[scope.id] = {
                    "id": scope.id,
                    "type": "editor-container"
                };
            }
            scope.model = scope.atom[scope.id];
            element[0].addEventListener("DOMSubtreeModified", function (evt) {
                scope.model.html = element.html();
                console.log(scope.model.html);
            });
        }
    };
    return editorContainer;
});