var app = angular.module('demoApp');
app.directive('dazzleFormSelect', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormSelect = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude:true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleFormSelect";
            scope.type = "dazzleFormSelect";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.menu)) {
                    scope.model.menu=[
                    {
                        "title":"Item 1",
                        "link":"#",
                        "list":[]
                    },
                    {
                        "title":"Item 2",
                        "link":"#",
                        "list":[]
                    },
                    {
                        "title":"Item 3",
                        "link":"#",
                        "list":[]
                    }];

                    scope.updateHtml();
                }

                 if (angular.isUndefined(scope.model.selection)) {
                    scope.model.selection="請選擇";
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.select = function (value){
                $scope.model.selection = value;
            }
            $scope.menuOptions = [
                 ["編輯選項", function () {
                   var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'menuPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            },
                            menu: function () {
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.model.menu = menu;
                        $scope.updateHtml();
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
    return dazzleFormSelect;
});