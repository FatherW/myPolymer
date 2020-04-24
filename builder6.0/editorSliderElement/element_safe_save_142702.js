var app = angular.module('demoApp');
app.directive('editorSliderElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var editorSliderElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorSliderElement";
            scope.type = "editorSliderElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.images)) {
                    scope.images = [{
                        
                    }]
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝Slider", function () {
                    $mdDialog.show({
                        controller: "galleryPopupController",
                        templateUrl: 'models/galleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            images: []
                        }
                    }).then(function (images) {
                        console.log(images);
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
        }
    };
    return editorSliderElement;
});