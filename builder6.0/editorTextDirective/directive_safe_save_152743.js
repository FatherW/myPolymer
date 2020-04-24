var app = angular.module('demoApp');
app.directive('text', function () {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $ocLazyLoad.load("css/medium-editor-theme.min.css");
            var editor = new MediumEditor($element, {
                autoLink: true,
                buttonLabels: 'fontawesome',
                placeholder: false,
                toolbar: {
                    buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                }
            }).subscribe('editableInput', function (event, element) {
                console.log('test changed');
            });
        }
    };
    return text;
});