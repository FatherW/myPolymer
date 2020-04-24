var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div ng-bind-html="model.html | to_trusted" context-menu="menuOptions"></editor-html-directive>',
        controller: function ($scope, $element, $attrs) {
            console.log('container hello');
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
                        $scope.containerCompile();
                    });
                }]
            ];
            $scope.containerCompile = function (stop) {
                setTimeout(function () {
                    $compile($element.contents())($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = $element.html();
                            if (angular.isUndefined(stop)) {
                                $scope.containerCompile(null);
                            }
                        });
                    }, 500);
                }, 200);
            }
        }
    };
    return editorContainer;
});