var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $templateRequest, $uibModal) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorImageElement/element.html";
    var editorImageElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('editorImageElement loading start');
            element.attr('custom', 'editor-image-element');
            console.log(element);
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('editorImageElement loading end');
            });
        },
        controller: function ($scope, $element, $attrs, $http) {
            //console.log('editorImageElement init start');
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

            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $scope.src = $element.attr('src') || "http://dazzle.gallery/img/logo.svg";
            $element.attr('id', $scope.id);

            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "html": '<img id="img-{{model.id}}" class="img-responsive" ng-src="{{model.src}}"/>',
                    "type": "editor-image-element"
                };
            } else {
                var element = $($scope.atom[$scope.id].html);

                element[0].setAttribute("ng-src", "{{model.src}}");
                element[0].removeAttribute("src");
                $scope.atom[$scope.id].html = element[0].outerHTML;
            }
            $scope.model = $scope.atom[$scope.id];

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
            $scope.editorCustomInit($scope, $element);
            //console.log('editorImageElement init end');
        }
    }
    return editorImageElement;
});