var app = angular.module('demoApp');
app.directive('kpleeSuntaPrice', function ($compile, $templateRequest,$mdDialog) {
    var kpleeSuntaPrice = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "kpleeSuntaPrice";
            scope.type = "kpleeSuntaPrice";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                    scope.model.field = "xxx";
                    scope.updateHtml();
                }*/

                if (angular.isUndefined(scope.model.realHtml)) {
                    $templateRequest("http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+scope.directiveId+"/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
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
                ["櫃貨價格數據管理", function () {
                    $scope.dataMng("price1");
                }],
                ["散貨價格數據管理", function () {
                    $scope.dataMng("price2");
                }],
                ["人民幣價格數據管理", function () {
                    $scope.dataMng("price3");
                }],
                ["工程塑料價格數據管理", function () {
                    $scope.dataMng("price4");
                }],
                ];
            $scope.dataMng = function(tab) {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: tab
                        }
                    }).then(function () {
                        if (!angular.isUndefined($scope.dataUpdate)) {
                            $scope.dataUpdate();
                        }
                    });
            };

        }
    };
    return kpleeSuntaPrice;
});