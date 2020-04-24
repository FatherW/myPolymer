var app = angular.module('demoApp');
app.directive('editorMenuDirective', function ($compile, $templateRequest) {
    var editorMenuDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorMenuDirective";
            scope.type = "editorMenuDirective";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["editorMenuDirective", function () {
                    console.log("Menu Clicked:editorMenuDirective");
                }]
            ];
        }
    };
    return editorMenuDirective;
});