var app = angular.module('demoApp');
app.directive('dazzleTab', function ($compile, $templateRequest, $uibModal, $mdDialog) {
    var dazzleTab = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleTab";
            scope.type = "dazzleTab";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.field)) {
                    scope.model.field = "tab";
                    scope.model.menu = [
                        {
                            "title": "Item 1",
                            "link": "#",
                            "html": "<div text>Please Type Something</div>",
                            "id": "item-" + new Date().getTime() + "-" + Object.keys($scope.atom).length,
                            "list": []
                        },
                        {
                            "title": "Item 2",
                            "link": "#",
                            "html": "<div text>Please Type Something</div>",
                            "id": "item-" + new Date().getTime() + "-" + Object.keys($scope.atom).length,
                            "list": []
                        },
                        {
                            "title": "Item 3",
                            "link": "#",
                            "html": "<div text>Please Type Something</div>",
                            "id": "item-" + new Date().getTime() + "-" + Object.keys($scope.atom).length,
                            "list": []
                        }];
                    scope.updateHtml();
                } else {
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
                ["編輯Menu", function () {
                    /*
                     $mdDialog.show({
                     templateUrl: 'models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                     controller: 'menuPopupCtrl',
                     size: 'lg',
                     clickOutsideToClose: true,
                     locals: {
                     rootScope: $scope,
                     menu: $scope.model.menu
                     }
                     });
                     */
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
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.model.menu = menu;
                        $scope.updateHtml();
                        //$scope.getTemplateHtml();
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
                // var panels=$('#'+$scope.model.id).find('.panel').each(function(index){
                //     $scope.model.menu[index].html = $(this).html();
                //     console.log(index);
                // });
                // console.log($scope.model.menu);
                // $scope.updateHtml();
            }
            $scope.afterAtomSaved = function () {
                console.log('After Save');

            }
        }
    };
    return dazzleTab;
});