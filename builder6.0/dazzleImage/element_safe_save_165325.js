/*
var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.pushMenu($scope, $element, $attrs, ["更換圖片", function () {
                $mdDialog.show({
                    controller: "userGalleryPopupController",
                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                }).then(function (image) {
                    $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                        console.log('http://' + $scope.exportBucket + '/' + image.key);
                    });
                });
            }]);
        }
    };
    return dazzleImage;
});*/

var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile, $templateRequest, $http, $mdDialog) {
    var dazzleImage = {
        restrict: 'A',
        scope: true,
        compile: function compile(element, attrs) {
            if (! attrs['compiled']) {
                element.attr('context-menu', 'menuOptions');
//                element.attr('bind-html-compile', 'model.html');
                element.attr('compiled', true);

                return  function (scope, element, attrs) {
                    scope.http = "http://d27btag9kamoke.cloudfront.net/";
                    scope.directiveId = "dazzleImage";
                    scope.type = "dazzleImage";
                    scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                    scope.templateUrl = scope.http + scope.templatePath;
                    $compile(element)(scope);
                };
            }
        },

        controller: function ($scope, $element, $attrs) {

            $scope.editorCustomInit($scope, $element, $attrs).then(function () {
                if (angular.isUndefined($scope.model.src)) {
                    if (!angular.isUndefined($element.attr('src')) && $element.attr('src')) {
                        $scope.model.src = $element.attr('src');
                    } else {
                        $scope.model.src = "http://dazzle.website/image/lgo.png";
                    }
                    $element.attr('src',$scope.model.src);
                }

                if ($element.attr('field') &&
                    $scope.thisPageJson &&
                    $scope.thisPageJson.exportDatas &&
                    $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                    $scope.model.src = $scope.thisPageJson.exportDatas[$element.attr('field')];
                    $element.attr('src',$scope.thisPageJson.exportDatas[$element.attr('field')]);
                }


            });

            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    $scope.featherEditor.scope = $scope;
                    $scope.featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $element.attr('src')
                    });
                }],
                ["更換圖片", function () {
                    $mdDialog.show({
                        controller: "userGalleryPopupController",
                        templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (image) {
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.src = 'http://' + $scope.exportBucket + '/' + image.key;
                                $element.attr('src',$scope.model.src);
                            });
                        });
                    });
                }]
            ];


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
    return dazzleImage;
});