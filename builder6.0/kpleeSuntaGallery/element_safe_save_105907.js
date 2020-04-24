var app = angular.module('demoApp',['angular-linq','angularLazyImg','fancyboxplus']);
app.directive('kpleeSuntaGallery', function ($compile, $templateRequest) {
    var kpleeSuntaGallery = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "kpleeSuntaGallery";
            scope.type = "kpleeSuntaGallery";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                    scope.model.field = "xxx";
                    scope.updateHtml();
                }*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs, $http,$sce,$timeout,$linq) {
            $scope.menuOptions = [
                ["kpleeSuntaGallery", function () {
                    console.log("Menu Clicked:kpleeSuntaGallery");
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
        }
    };
    return kpleeSuntaGallery;
});