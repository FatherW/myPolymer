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
            element[0].removeEventListener('DOMSubtreeModified', function () {
                
            });
            element[0].addEventListener("DOMSubtreeModified", function (evt) {
                scope.atom[scope.id].html = element.html();
                console.log(scope.atom[scope.id].html);
            });
        }
    };
    return editorContainer;
});