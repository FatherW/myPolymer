var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $templateRequest) {
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
                scope.model.html = '<img id="img-{{model.id}}" class="img-responsive" src="{{model.src}}"/>'
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
                        var jdate = JSON.parse(result.data);
                        if (jdate.code > 0) {
                            $scope.model.src = jdate.text;
                            var element = $($scope.atom[$scope.id].html);
                            element[0].setAttribute("ng-src", "{{model.src}}");
                            element[0].removeAttribute("src");
                            $scope.atom[$scope.id].html = element[0].outerHTML;
                        }
                        featherEditor.close();
                    });
                }
            });
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
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
                                var element = $($scope.atom[$scope.id].html);
                                element[0].setAttribute("ng-src", "{{model.src}}");
                                element[0].removeAttribute("src");
                                $scope.atom[$scope.id].html = element[0].outerHTML;
                            });
                        });
                    });
                }]
            ];
        }
    };
    return editorImageElement;
});