var app = angular.module('demoApp');
app.directive('editorHtmlElement', function ($compile, $templateRequest,$dazzleUser) {
    var editorHtmlElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<div id="root" bind-html-compile="rootHtml" context-menu="menuOptions"></div>',
        controller: function ($scope, $http, $element) {
            $scope.menuOptions = [
                ['編緝HTML', function () {
                    $scope.editRootHtml();
                }]/*,
                ['JS/Css 管理', function () {
                    $scope.openPageJsCssPopup($scope.thisPageJson).then(function (newThisPageJson) {
                        $scope.thisPageJson = newThisPageJson;
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', newThisPageJson);
                    });
                }]*/
            ];
        }
    };
    return editorHtmlElement;
});