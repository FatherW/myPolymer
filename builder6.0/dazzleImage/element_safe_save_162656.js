var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            if (element.closest('[context-menu]').length > 0) {
                console.log("This element nothing content menu");
            } else {
                console.log("This parent have content menu", element.closest('[context-menu]'));
            }
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            /*$scope.menuOptions = $scope.menuOptions.concat(["更換圖片", function () {
                $mdDialog.show({
                    controller: "userGalleryPopupController",
                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                }).then(function (image) {
                    console.log(image);
                });
            }], ["更換圖片", function () {
                $mdDialog.show({
                    controller: "userGalleryPopupController",
                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                }).then(function (image) {
                    console.log(image);
                });
            }]);*/
        }
    };
    return dazzleImage;
});