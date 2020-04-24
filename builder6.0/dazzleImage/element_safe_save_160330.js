var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile, $dazzleS3) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            if (element.closest('[context-menu]').length > 0) {
                if (angular.isUndefined(element.attr('context-menu'))) {
                    element.attr('context-menu', 'menuOptions');
                    console.log('!!!!!!@@@@@');
                    console.log($dazzleS3);
                    $compile(element)(scope);
                }
            }
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.menuOptions = [
                ["更換圖片", function () {
                    $mdDialog.show({
                        controller: "userGalleryPopupController",
                        templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (image) {
                        console.log(image);
                    });
                }]
            ];
        }
    };
    return dazzleImage;
});