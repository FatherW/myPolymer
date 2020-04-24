var app = angular.module('demoApp');
app.directive('dazzleForm3', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleForm3 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleForm3";
            scope.type = "dazzleForm3";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

                if (angular.isUndefined(scope.model.form)) {
                    scope.model.form = [
                    {
                        "id": "1",
                        "label": "電郵",
                        "type": "email"
                    }
                    ];
                    scope.updateHtml();
                }


                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編輯表格", function () {
                      var modalInstance = $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table:"form"
                                }
                            }).then(function(){
//                               $scope.loadNews();

                                $scope.model.form = [
                                  {
                                      "id": "1",
                                      "label": "電郵",
                                      "type": "email"
                                  },
                                  { 
                                      "id": "2",
                                      "label": "test",
                                      "type": "text"
                                  }
                                ];


                                console.log("scope.model.form = " + $scope.model.form);

                                $scope.updateHtml();
                            });

                        console.log("after show = " + modalInstance);
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
    return dazzleForm3;
});