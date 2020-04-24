var app = angular.module('demoApp');
app.directive('dazzleTable', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleTable = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleTable";
            scope.type = "dazzleTable";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["最頂加一行", function () {
                    $( ".about_history tr:first-child" ).before( "<tr><td width=\"104\" valign=\"top\">輸入年份</td><td>輸入資料</td></tr>" );

                }],
                ["最底加一行", function () {
                    $( ".about_history tr:last-child" ).after( "<tr><td width=\"104\" valign=\"top\">輸入年份</td><td>輸入資料</td></tr>" );

                }],

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
                 }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleTable;
});