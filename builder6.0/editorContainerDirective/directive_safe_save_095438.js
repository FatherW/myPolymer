var app = angular.module('demoApp');
app.directive('editorContainer', function () {
    var editorContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<editor-html-directive ng-bind-html="containerHtml | to_trusted"></editor-html-directive>',
        controller: function ($scope, $element) {
            $scope.containerHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
        }
    };
    return editorContainer;
});