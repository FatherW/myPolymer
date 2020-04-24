var app = angular.module('demoApp');
app.directive('cccgDownloadTable', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var cccgDownloadTable = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "cccgDownloadTable";
            scope.type = "cccgDownloadTable";
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
            $scope.loadNews = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/download-data.json").then(function (json) {
                        $scope.model.news = json;
						console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/download-data.json", []);
                        resolve([]);
                    });
                });                
            }

            $scope.menuOptions = [
            
                ["編輯新聞", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"download"
                                }
                            }).then(function(){
                                $scope.loadNews();
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
    return cccgDownloadTable;
});