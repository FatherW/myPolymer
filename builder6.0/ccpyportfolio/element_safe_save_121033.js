var app = angular.module('demoApp');
app.directive('ccpyportfolio', function ($compile, $templateRequest, $mdDialog) {
    var ccpyportfolio = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "ccpyportfolio";
            scope.type = "ccpyportfolio";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝Portfolio", function () {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: "portfolio"
                        }
                    }).then(function () {
                        $scope.updateHtml();
                    });
                }]
            ];

            $scope.updateHtml = function () {
                $scope.getJson($scope.userBucket, $scope.websiteKey + 'content/portfolio-data.json').then(function (portfolio) {
                    $scope.portfolio = portfolio;
                    $scope.initCategory(portfolio);
                    $templateRequest(scope.templateUrl + "?id" + new Date().getTime()).then(function (html) {
                        var template = angular.element(html);
                        $compile(template)($scope);
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.model.html = template.html()
                                    .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                    .replace(/myclick/g, "onclick")
                                    .replace(/<!--(.*?)-->/gm, "");
                            });
                        }, 500);
                    });
                });
            }

            $scope.initCategory = function (portfolio) {
                $scope.category = [];
                for (var i = 0; i < portfolio.length; i++) {
                    if (portfolio[i].index && $scope.category.indexOf(portfolio[i].category) < 0) {
                        $scope.category.push(portfolio[i].category);
                    }
                }
            }
        }
    };
    return ccpyportfolio;
});