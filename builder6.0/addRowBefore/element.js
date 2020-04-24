var app = angular.module('demoApp');
app.directive('addRowBefore', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var addRowBefore = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        transclude: true,
        template: '<div context-menu="menuOptions" ng-transclude></div>',
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "addRowBefore";
            scope.type = "addRowBefore";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
/*            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
*/


            if ('custom' in attrs) {
                var id = attrs.id || "ele" + new Date().getTime() + "-" + Object.keys(scope.atom).length;
                if (angular.isUndefined(scope.atom[id])) {
                    scope.atom[id] = {
                        "id": id,
                        "type": "editor-container-model"
                    };
                    if (!$.trim(element.html())) {
                        scope.atom[id].html = '<div>editor-container-model</div>'
                    } else {
                        var oldElement = angular.element("<div></div>").html(element.html());
                        scope.unwrap(oldElement);
                        scope.atom[id].html = oldElement.html();
                    }
                }
                var tmpElement = angular.element("<div></div>").append(scope.atom[id].html);
                scope.unwrap(tmpElement);
                element.children('[context-menu]').eq(0).html(tmpElement.html());
                $compile(element.children('[context-menu]').eq(0).contents())(scope);
            }
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["加一行", function () {
                    console.log("Menu Clicked:addRowBefore");
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
    return addRowBefore;
});