var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $uibModal, $ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + "directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            var editor = new MediumEditor('editor-body');
            $ocLazyLoad.load(path + "directive.css");
        }
    };
    return editorHtmlDirective;
});