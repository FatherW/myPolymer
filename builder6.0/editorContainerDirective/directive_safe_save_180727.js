var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div ng-bind-html="model.html | to_trusted" context-menu="menuOptions"></editor-html-directive>',
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
            $scope.model = $scope.atom[$scope.id];
            $scope.menuOptions = [
                ['編緝Container', function () {
                    $scope.openCodePopup($scope.model.html, 'html').then(function (newCode) {
                        $scope.model.html = newCode;
                        $scope.compile();
                    });
                }]
            ];

            $scope.containerCompile = function (stop) {
                var compiled = $compile($element.contents())($scope);
                setTimeout(function () {
                    console.log(compiled);
                }, 2000);
            };

            $scope.containerCompile();
        }
    };
    return editorContainer;
});