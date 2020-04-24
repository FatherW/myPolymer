var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        link: function (scope, element, attr) {
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
        },
        //templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/editorContainerDirective/directive.html",
        controller: function ($scope, $element) {
            //$scope.model = $scope.atom[$scope.id];
            //$scope.model.html = $element.html();
        }
    };
    return editorContainer;
});