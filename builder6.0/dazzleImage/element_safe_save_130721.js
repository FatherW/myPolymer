var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.editorCustomInit($scope, $element, $attrs);
            $scope.pushMenu($scope, $element, $attrs, ["編緝圖片", function ($itemScope) {
                $scope.featherEditor.scope = $scope;
                $scope.featherEditor.launch({
                    image: 'img' + '-' + $scope.model.id,
                    url: $scope.model.src
                });
            }]);
            $scope.pushMenu($scope, $element, $attrs, ["更換圖片", function () {
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
                            $scope.useTemplate();
                        });
                    });
                });
            }]);
        }
    };
    return dazzleImage;
});