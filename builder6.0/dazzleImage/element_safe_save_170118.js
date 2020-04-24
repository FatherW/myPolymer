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
            if ($element.closest('[context-menu]').length <= 0 && angular.isUndefined($element.attr('context-menu'))) {
                $scope.menuOptions = [];
                $element.attr('context-menu', 'menuOptions');
                console.log('before compile');
                $compile($element)($scope);
                console.log('after compile');
            } else {
                console.log('menuOptions', $scope.menuOptions);
                $scope.menuOptions.push(["更換圖片", function () {
                    console.log($element);
                }]);
            }
        }
    };
    return dazzleImage;
});