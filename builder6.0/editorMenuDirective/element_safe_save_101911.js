var app = angular.module('demoApp');
app.directive('editorMenuDirective', function ($compile, $templateRequest) {
    var editorMenuDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            setTimeout(function () {
                console.log(JSON.stringify(scope.model));
                var template = angular.element('<div bind-html-compile="model.html" content-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            }, 500);
        },
        controller: function ($scope, $element, $attrs) {
            $scope.directiveId = "editorMenuDirective";
            $scope.type = "editorMenuDirective";
            $scope.editorCustomInit($scope, $element, $attrs);
            $scope.menuOptions = [
                ["editorMenuDirective", function () {
                    console.log("Menu Clicked:editorMenuDirective");
                }]
            ];
            console.log(JSON.stringify($scope.model));
        }
    };
    return editorMenuDirective;
});