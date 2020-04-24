var app = angular.module('demoApp');
app.directive('sssSubmitAssignment', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var sssSubmitAssignment = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "sssSubmitAssignment";
            scope.type = "sssSubmitAssignment";
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
                    $scope.loadSubAssignment = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/subassignment-data.json").then(function (json) {
                        
                        $scope.$apply(function(){
                            $scope.model.subassignment = json;
                        });
                        
                        $scope.updateHtml();

                        console.log('Submit Assignment',json);
                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/subassignment-data.json", []);
                        resolve([]);
                    });
                });                
            }
            
            $scope.menuOptions = [
                ["編輯功課", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"subassignment"
                                }
                            }).then(function() {
                                $scope.loadSubAssignment();
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
    return sssSubmitAssignment;
});