var app = angular.module('demoApp');
app.directive('dazzleFormTextElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormTextElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
        	
        	console.log(attrs);
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleFormTextElement";
            scope.type = "dazzleFormTextElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="dazzleFormTextElementMenu"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
        	console.log($scope.model);
            $scope.dazzleFormTextElementMenu = [
                ["dazzleFormTextElement", function () {
                    console.log("Menu Clicked:dazzleFormElement");
                }],
                ['欄位設置', function ($itemScope) {
                		console.log($itemScope);
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