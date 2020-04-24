var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            if (angular.isUndefined(element.attr('context-menu'))) {
                element.attr('context-menu', 'menuOptions');
                $compile(element)(scope);
            }
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
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
    return dazzleLink;
});