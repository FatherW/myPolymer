var app = angular.module('demoApp');
app.directive('editorYoutubeElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var editorYoutubeElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorYoutubeElement";
            scope.type = "editorYoutubeElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            $compile(element)(scope);
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["editorYoutubeElement", function () {
                    console.log("Menu Clicked:editorYoutubeElement");
                }]
            ];
        }
    };
    return editorYoutubeElement;
});