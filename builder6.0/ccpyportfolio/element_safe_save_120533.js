var app = angular.module('demoApp');
app.directive('ccpyportfolio', function ($compile, $templateRequest, $mdDialog) {
    var ccpyportfolio = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "ccpyportfolio";
            scope.type = "ccpyportfolio";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝Portfolio", function () {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: "slider"
                        }
                    }).then(function () {
                        $scope.updateHtml().then(function () {
                            console.log($scope.model.html);
                        });
                    });
                }]
            ];
        }
    };
    return ccpyportfolio;
});