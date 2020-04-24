var app = angular.module('demoApp');
app.directive('kpleeSuntaChart', function ($compile, $templateRequest,$mdDialog) {
    var kpleeSuntaChart = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "kpleeSuntaChart";
            scope.type = "kpleeSuntaChart";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                    scope.model.field = "xxx";
                    scope.updateHtml();
                }*/

                if (angular.isUndefined(scope.model.realHtml)) {
                    $templateRequest("http://d27btag9kamoke.cloudfront.net/builder6.0/"+scope.directiveId+"/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
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
                ["數據管理", function () {
                    $scope.dataMng("chart");
                }],
                ["新新聞管理", function () {
                    $scope.dataMng("news9");
                }]
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
    return kpleeSuntaChart;
});