var app = angular.module('demoApp');
app.directive('editorImageElement', function ($uibModal, $ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorImageElement/";
    var editorImageElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs, $http) {
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
                            $scope.compile();
                        }
                        featherEditor.close();
                    });
                }
            });
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $scope.src = $attrs.src || "http://dazzle.gallery/img/logo.svg";
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
                ["編緝圖片", function ($itemScope) {
                    featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/galleryPopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userGalleryPopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    });
                    modalInstance.result.then(function (image) {
                        console.log(image);
                    });
                }]
            ];
            //element init
        }
    }
    return editorImageElement;
});