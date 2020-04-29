var app = angular.module('demoApp');
app.directive('dazzleMenu2', function ($compile, $templateRequest,$uibModal,$mdDialog) {
    var dazzleMenu2 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleMenu2";
            scope.type = "dazzleMenu2";
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
//                    scope.updateHtml();
                } else {
                    list = element.attr('list');
                    var id = element.attr('id');
                    console.log(list);
                    console.log('id',element.attr('id'));
                    if(!angular.isUndefined(list)){
                    	scope.atom[id].menu = scope.atom[list].menu;
                    	scope.model.menu = scope.atom[list].menu;
                    	scope.updateHtml();
                    }
                }   
                scope.useTemplate();

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
                        $scope.useTemplate();

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
        }
    };
    return dazzleMenu2;
});