var app = angular.module('demoApp');
app.directive('sssStudent', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var sssStudent = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "sssStudent";
            scope.type = "sssStudent";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

                 scope.updateHtml();
                
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.loadStudent = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/user-data.json").then(function (json) {
                        
                        $scope.$apply(function(){
                            $scope.model.user = json;
                        });
                        

                        $scope.updateHtml();

                        console.log('User',json);
                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/user-data.json", []);
                        resolve([]);
                    });
                });                
            }
            $scope.menuOptions = [
                ["學生管理", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"user"
                                }
                            }).then(function() {
                                $scope.loadUser();
                            });
                }],                ["sssStudent", function () {
                    console.log("Menu Clicked:sssStudent");
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
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return sssStudent;
});