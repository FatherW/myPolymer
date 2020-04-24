var app = angular.module('demoApp');
app.directive('dazzleFormTextElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormTextElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        /*scope: {
        	detauleObj:'='
        },
        transclude: true,
        replace: true,*/
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleFormTextElement";
            scope.type = "dazzleFormTextElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
            	if (angular.isUndefined(scope.model.textElement)) {
                    scope.model.textElement={
                        "id": "id-" + new Date().getTime(),
           				"label": "欄位名稱",
           				"name":"name" + new Date().getTime(),
            			"width": "10%",
            			"type": "text",
            			"value":"",
               			"show": true,
            			"hideAble": false,
            			"required": true,
            			"editAble": true,
            			"removeAble": true
                    }
                    
                    scope.updateHtml();
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="dazzleFormTextElementMenu"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
        	console.log($scope.formId);
            $scope.dazzleFormTextElementMenu = [
                ["dazzleFormTextElement", function () {
                    console.log("Menu Clicked:dazzleFormElement");
                }],
                ['欄位設置', function ($itemScope) {
                		$mdDialog.show({
                 			controller: 'formTextElementPopupController',
                 			templateUrl: 'models/formTextElementPopup/popup.html' + "?id=" + new Date().getTime(),
                 			locals: {
                 				rootScope: $scope.model,
                 				formId: $scope.formId,
                 			}
                 			}).then(function (returnData) {
                 				$scope.model.textElement=returnData;
                 				$scope.updateHtml();
                 		});
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleFormTextElement;
});