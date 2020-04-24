var app = angular.module('demoApp');
app.directive('dazzleFormElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleFormElement";
            scope.type = "dazzleFormElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
            	scope.formId=new Date().getTime();
            	if (angular.isUndefined(scope.model.formTable)) {
                    scope.model.formTable=[
                    {
                        "id": "id-" + new Date().getTime(),
           				"label": "用戶名",
           				"name":"用戶名",
            			"width": "10%",
            			"type": "text",
            			"value":"",
               			"show": true,
            			"hideAble": false,
            			"required": true,
            			"editAble": true,
            			"removeAble": true
                    },
                    {
                        "id": "id-" + new Date().getTime(),
           				"label": "用戶名2",
           				"name":"用戶名2",
            			"width": "10%",
            			"type": "text",
            			"value":"",
               			"show": true,
            			"hideAble": false,
            			"required": true,
            			"editAble": true,
            			"removeAble": true
                    }];

                    scope.updateHtml();
                }
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["dazzleFormElement", function () {
                    console.log("Menu Clicked:dazzleFormElement");
                }],
                ['表格設置', function ($itemScope, node) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            keyboard: false,
                            templateUrl: 'models/formTablePopup/formTablePopup.html' + "?id=" + new Date().getTime(),
                            controller: 'formTablePopupController',
                            size: 'lg',
                            resolve: {
                                "table": function () {
                                    return $scope.model.formTable
                                }
                            }
                        });
                        modalInstance.result.then(function (table) {
                            $scope.model.formTable = table;
                            $scope.updateHtml();
                        });
                    }]
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
            
            $scope.dazzleFormTextElementMenu = [
                ["dazzleFormTextElement", function () {
                    console.log("Menu Clicked:dazzleFormElement");
                }],
                ['欄位設置', function ($itemScope) {
                		console.log($itemScope);
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
                		/*
                        var modalInstance = $uibModal.open({
                            animation: true,
                            keyboard: false,
                            templateUrl: 'models/formTablePopup/formTablePopup.html' + "?id=" + new Date().getTime(),
                            controller: 'formTablePopupController',
                            size: 'lg',
                            resolve: {
                                "table": function () {
                                    return $scope.model.formTable
                                }
                            }
                        });
                        modalInstance.result.then(function (table) {
                            $scope.model.formTable = table;
                            $scope.updateHtml();
                        });
                        */
                    }]
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
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleFormElement;
});