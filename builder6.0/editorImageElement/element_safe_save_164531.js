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
                scope.updateToNgSrc();

                if (angular.isUndefined(scope.model.src)) {
                    scope.model.src = "http://dazzle.gallery/img/logo.svg";
                }

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            var featherEditor = new Aviary.Feather({
                apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
                theme: 'light',
                tools: 'all',
                language: "zh_HANT",
                appendTo: '',
                apiVersion: 3,
                onSave: function (imageID, newURL) {
                    $http({
                        "method": "post",
                        "url": "https://122nqw3zfj.execute-api.ap-northeast-1.amazonaws.com/prod",
                        "data": {
                            "photoUrl": newURL,
                            "bucket": $scope.exportBucket
                        }
                    }).then(function (result) {
                        console.log(featherEditor);
                        /*var jdate = JSON.parse(result.data);
                         if (jdate.code > 0) {
                         $scope.model.src = jdate.text;
                         $scope.updateToNgSrc();
                         }*/
                        featherEditor.close();
                    });
                }
            });
            $scope.updateToNgSrc = function () {
                var element = $($scope.model.html);
                element[0].setAttribute("ng-src", "{{model.src}}");
                element[0].removeAttribute("src");
                $scope.model.html = element[0].outerHTML;
            }
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    featherEditor.model = $scope.model;
                    console.log(featherEditor);
                    featherEditor.launch({
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
                                $scope.updateToNgSrc();
                            });
                        });
                    });
                }]
            ];
        }
    };
    return editorImageElement;
});