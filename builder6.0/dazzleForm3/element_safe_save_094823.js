var app = angular.module('demoApp');
app.directive('dazzleForm3', function ($compile, $templateRequest, $uibModal, $mdDialog) {
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

                console.log('scopemodel', scope.model);

                if (angular.isUndefined(scope.model.menu)) {
                    console.log(scope.model);

                    scope.model.menu = [{
                        "id": "1",
                        "label": "電郵",
                        "type": "email",
                        "title": "Item 1",
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
                ["編緝表格", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/formPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'formPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            },
                            menu: function () {
                                console.log($scope.model.menu);
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.model.menu = menu;
                        console.log('Menu',menu);
                        $scope.useTemplate();
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
        }
    };
    return dazzleForm3;
});