var app = angular.module('demoApp');
app.directive('culhkShop', function ($compile, $templateRequest,$mdDialog) {
    var culhkShop = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "culhkShop";
            scope.type = "culhkShop";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime();
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.realHtml)) {
                    $templateRequest("http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/culhkShop/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
                           scope.model.realHtml = html;     
                    });
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
                ["產品管理", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"product2"
                                }
                            }).then(function(){
                            //    $scope.loadNews();
                            });
                }],
                ["訂單管理", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"order2"
                                }
                            }).then(function(){
                            //    $scope.loadNews();
                            });
                }],

                /*,
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

            $scope.productMng = function() {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: "product"
                        }
                    }).then(function () {
                        if (!angular.isUndefined($scope.dataUpdate)) {
                            $scope.dataUpdate();
                        }
                    });
            };

            $scope.orderMng = function() {
                  $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: "order"
                        }
                    }).then(function () {
                        if (!angular.isUndefined($scope.dataUpdate)) {
                            $scope.dataUpdate();
                        }
                    });
            };
        }
    };
    return culhkShop;
});