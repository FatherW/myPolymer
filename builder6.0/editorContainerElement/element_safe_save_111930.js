var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest) {
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorContainerElement";
            scope.type = "editorContainerElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ['編緝Container', function () {
                    $scope.openCodePopup($scope.model.html, 'html').then(function (newCode) {
                        $scope.$apply(function () {
                            $scope.model.html = newCode;
                        });
                    });
                }],
                ["新增元素", function () {
                    alert('新增元素');
                }]
            ];
        }
    };
    return editorContainerElement;
});