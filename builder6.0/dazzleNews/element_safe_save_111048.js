var app = angular.module('demoApp');
app.directive('dazzleNews', function ($compile, $templateRequest, $dazzlePopup, $mdDialog, $uibModal) {
    var dazzleNews = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleNews";
            scope.type = "dazzleNews";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                scope.useTemplate();
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });


            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.loadNews = function () {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/news-data.json").then(function (json) {
                        $scope.model.news = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/news-data.json", []);
                        resolve([]);
                    });
                });
            }

            $scope.menuOptions = [

                ["編輯新聞", function () {
                    $dazzlePopup.dataManagement($scope.websiteId, $scope.data).then(function () {
                        if ($scope.loadNews) {
                            $scope.loadNews();
                        }
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
    return dazzleNews;
});