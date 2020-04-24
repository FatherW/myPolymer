var app = angular.module('demoApp');
app.directive('kpleeRunbox', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var kpleeRunbox = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "kpleeRunbox";
            scope.type = "kpleeRunbox";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.list)) {
                 scope.model.list = [
                        {
                            "title":"圖片1",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-02.jpg"
                        },
                        {
                            "title":"圖片2",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-04.jpg"
                        },
                        {
                            "title":"圖片3",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片4",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片5",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片6",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        }
                        
                    ];

                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["kpleeRunbox", function () {
                    console.log("Menu Clicked:kpleeRunbox");
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
    return kpleeRunbox;
});