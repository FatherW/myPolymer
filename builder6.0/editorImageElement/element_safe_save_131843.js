var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $templateRequest, $http, $uibModal) {
    var editorImageElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorImageElement";
            scope.type = "editorImageElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.src)) {
                    scope.model.src = "http://dazzle.gallery/img/logo.svg";
                }

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                    scope.updateHtml();
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    $scope.featherEditor.scope = $scope;
                    $scope.featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/galleryPopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userGalleryPopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (image) {
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.src = 'http://' + $scope.exportBucket + '/' + image.key;
                                $scope.updateHtml();
                            });
                        });
                    });
                }], ["管理鏈結", function () {
                    $scope.linkPopup($element).then(function (result) {
                        switch (result.type) {
                            case "setLink":
                                console.log(result.link);
                                break;
                            case "saveLink":
                                if (angular.isUndefined($scope.thisPageJson.anchor)) {
                                    $scope.thisPageJson.anchor = [];
                                }
                                $scope.thisPageJson.anchor.push(result.link);
                                break;
                        }
                    });
                }]
            ];
        }
    };
    return editorImageElement;
});