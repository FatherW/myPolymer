var app = angular.module('demoApp');
app.directive('ccpymenu', function ($compile, $templateRequest, $mdDialog) {
    var ccpymenu = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://dazzle-template.s3.amazonaws.com/";
            scope.directiveId = "ccpymenu";
            scope.type = "ccpymenu";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.menu)) {
                    scope.model.menu = [
                        {
                            "title": "Item 1",
                            "link": "#",
                            "list": []
                        },
                        {
                            "title": "Item 2",
                            "link": "#",
                            "list": []
                        },
                        {
                            "title": "Item 3",
                            "link": "#",
                            "list": []
                        }];

                    scope.updateHtml();
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["ccpymenu", function () {
                    console.log("Menu Clicked:ccpymenu");
                }]/*,
                 ["更換模版", function () {
                 $mdDialog.show({
                 controller: 'templatePopupController',
                 templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                 locals: {
                 rootScope: $scope
                 }
                 }).then(function (template) {
                 $scope.useTemplate();
                 });
                 }]*/
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return ccpymenu;
});