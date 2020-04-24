var app = angular.module('demoApp');
app.directive('getQuestion2', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var getQuestion2 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "getQuestion2";
            scope.type = "getQuestion2";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                 if (angular.isUndefined(scope.model.realHtml)) {
                    $templateRequest("http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+scope.directiveId+"/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
                           scope.model.realHtml = html;     
                    });
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["getQuestion2", function () {
                    console.log("Menu Clicked:getQuestion2");
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
    return getQuestion2;
});