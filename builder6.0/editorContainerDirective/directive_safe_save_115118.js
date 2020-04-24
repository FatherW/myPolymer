var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<editor-html-directive ng-bind-html="containerHtml | to_trusted"></editor-html-directive>',
        compile: function (element) {
            console.log(element.html());
            // return link function if needed
            return function (scope, element) {
                console.log('link function');
            }
        },
        controller: function ($scope, $element) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container"
                };
            } else {
                console.log($scope.atom[$scope.id].html);
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.containerHtml = "<h1 style='text-align: center;'>hello world</h1>";
            /*setInterval(function () {
             $scope.$apply(function () {
             $scope.containerHtml = $scope.containerHtml + "a";
             });
             }, 3000);*/
            $scope.$watch(function () {
                return $scope.containerHtml;
            }, function () {
                $scope.model.html = $element.html();
                console.log($element.html());
            });
        }
    };
    return editorContainer;
});