var app = angular.module('demoApp');
app.directive('dazzleFormTextElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormTextElement = {
        restrict: 'E',
        priority: 1000,
        //scope: true,
        transclude: true,
        scope: {
        	defaultValue: '='
      	},
        link: function (scope, element, attrs,) {
        	
        },
        controller: function ($scope, $element, $attrs,$rootScope) {
        	console.log($scope);
        	console.log($rootScope);
            $scope.http = "http://d27btag9kamoke.cloudfront.net/";
            $scope.directiveId = "dazzleFormTextElement";
            $scope.type = "dazzleFormTextElement";
            $scope.templatePath = "builder6.0/" + $scope.directiveId + "/element.html?id=" + new Date().getTime()
            $scope.templateUrl = $scope.http + $scope.templatePath;
            $rootScope.editorCustomInit($scope, $element, $attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                $element.html(template);
                $compile(template)($scope);
            });
            $scope.dazzleFormTextElementMenu = [
                ["dazzleFormTextElement", function ($itemScope, $event, modelValue, text, $li) {
                	console.log($scope.$eval);
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
    return dazzleFormTextElement;
});