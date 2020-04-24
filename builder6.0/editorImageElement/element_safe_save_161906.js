var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $templateRequest, $http, $mdDialog) {
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
                    if (!angular.isUndefined(element.attr('src')) && element.attr('src')) {
                        scope.model.src = element.attr('src');
                    } else {
                        scope.model.src = "http://dazzle.website/image/lgo.png";
                    }
                }

                if (element.attr('field') &&
                    scope.thisPageJson &&
                    scope.thisPageJson.exportDatas &&
                    scope.thisPageJson.exportDatas[element.attr('field')]) {
                    scope.model.src = scope.thisPageJson.exportDatas[element.attr('field')];
                    scope.useTemplate();
                }

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
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
                    $mdDialog.show({
                        controller: "userGalleryPopupController",
                        templateUrl: 'models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (image) {
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.src = 'http://' + $scope.exportBucket + '/' + image.key;
                                $scope.useTemplate();
                            });
                        });
                    });
                }], ["管理鏈結", function () {
                    $scope.linkPopup(null, $scope.model.link).then(function (result) {
                        $scope.model.link = result.link;
                    });
                }], ["更換模版", function () {
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
            //            console.log('Field');
//                console.log('Field',$element.attr('field'));
//                console.log($scope.thisPageJson);


            $scope.beforeAtomSaved = function () {
                if ($element.attr('field') &&
                    $scope.thisPageJson &&
                    $scope.thisPageJson.exportDatas &&
                    $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                    var field = $element.attr('field');
                    $scope.thisPageJson.exportDatas[field] = $scope.model.src;
                }
            }
        }
    };
    return editorImageElement;
});