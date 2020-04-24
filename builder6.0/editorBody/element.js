var app = angular.module('demoApp');
app.directive('editorBody', function () {
    var editorBody = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl:  "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/editorBody/element.html?id="+ new Date().getTime(),
//        templateUrl: "http://builder.dazzle.website/directives/editorBody/directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {

        }
    };
    return editorBody;
});