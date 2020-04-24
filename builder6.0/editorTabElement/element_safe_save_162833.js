var app = angular.module('demoApp');
app.directive('editorTabElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var editorTabElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorTabElement";
            scope.type = "editorTabElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.menu)) {
                    scope.model.menu = [{
                        "title": "Item 01",
                        "id": "menu-" + new Date().getTime(),
                        "link": "#",
                        "type": 'Menu',
                        "list": []
                    }];
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編輯Menu", function () {
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
                        $scope.updateHtml().then(function () {
                            $compile($element.contents())($scope);
                        });
                    });
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return editorTabElement;
});