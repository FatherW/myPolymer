var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            console.log('dazzleImage', 'link', element);
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            if ($element.closest('[context-menu]').length < 0 && angular.isUndefined($element.attr('context-menu'))) {
                $scope.menuOptions = [];
                $element.attr('context-menu', 'menuOptions');
                $compile($element)(scope);
            } else {
                $scope.menuOptions.push(["更換圖片", function () {
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
                }]);
            }

        }
    };
    return dazzleImage;
});