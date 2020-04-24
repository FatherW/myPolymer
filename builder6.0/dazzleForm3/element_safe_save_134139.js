var app = angular.module('demoApp');
app.directive('dazzleForm3', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleForm3 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleForm3";
            scope.type = "dazzleForm3";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

/*
                if (angular.isUndefined(scope.model.field)) {
                    scope.model.field = "xxx";
                    scope.updateHtml();
                    //scope.updateRealHtml();
                }
*/

            if (angular.isUndefined(scope.model.menu)) {
                    scope.model.menu = [{
                        "id": "1",
                        "title": "Item 1",
                        "link": "#",
                        "list": []
                    }, {
                        "id": "2",
                        "title": "Item 2",
                        "link": "#",
                        "list": []
                    }, {
                        "id": "3",
                        "title": "Item 3",
                        "link": "#",
                        "list": []
                    }];
                    scope.updateHtml();
                }




                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["dazzleForm3", function () {
                    console.log("Menu Clicked:dazzleForm3");
                }],
                ["編輯資料", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"form"
                                }
                            }).then(function(){
//                                $scope.loadNews();
                            });
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
    return dazzleForm3;
});