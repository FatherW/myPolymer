var app = angular.module('demoApp');
app.directive('dataHtml', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzlePopup) {
    var name = 'dataHtml';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dataHtml/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            console.log('Data Text');
        }
    };
    return link;
});