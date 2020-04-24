var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $uibModal, $ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + "directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            var editor = new MediumEditor('editor-html-directive', {
                autoLink: true,
                buttonLabels: 'fontawesome',
                placeholder: false,
                toolbar: {
                    buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                }
            }).subscribe('editableInput', function (event, editable) {
                console.log('htmlelement changed');
            });
            $ocLazyLoad.load(path + "directive.css");
            $ocLazyLoad.load("css/medium-editor-theme.min.css");
            $scope.rootHtml = "hello world";
            $scope.menuOptions = [
                ['編緝HTML', function ($itemScope) {
                    console.log('html');
                }]
            ];
        }
    };
    return editorHtmlDirective;
});