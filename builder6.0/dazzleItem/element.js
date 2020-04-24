var app = angular.module('demoApp');
app.directive('dazzleItem', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleItem = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleItem";
            scope.type = "dazzleItem";
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
               ["編輯排序", function () {
                    var list=$element.attr('list');
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/tabPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'tabPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            },
                            menu: function () {
                                return $scope.atom[list].menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.atom[list].menu = menu;
                        console.log(menu);
                    });

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
    return dazzleItem;
});