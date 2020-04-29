var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        link: function (scope, element, attrs) {
            scope.id = element[0].id || "con" + new Date().getTime();
            element[0].id = scope.id;
            if (angular.isUndefined(scope.atom[scope.id])) {
                console.log('this is new container,copy content to html', element.html());
                scope.atom[scope.id] = {
                    "id": scope.id,
                    "type": "editor-container",
                    "html": element.html()
                };
            }
            scope.model = scope.atom[scope.id];
            console.log(scope.model);
        },
        template: function (element, attrs) {
            setTimeout(function () {
                return '<div>{{model.html}}</div>'
            }, 200);
        }
    };
    return editorContainer;
});