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
                        $scope.$apply(function () {
                            $scope.model.html = newCode;
                        });
                    });
                }]
            ];
            $scope.$watch('model.html', function () {
                console.log('html updated');
                $compile($element.contents())($scope);
            })
        }
    };
    return editorContainer;
});