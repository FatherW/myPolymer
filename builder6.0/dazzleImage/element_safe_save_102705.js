var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            if (angular.isUndefined($attrs['context-menu']) && $element.closest('[context-menu]').length <= 0) {
                $element.attr('context-menu', 'menuOptions');
                $compile($element)($scope);
            } else {
                $scope.menuOptions = $scope.menuOptions || [];
                $scope.menuOptions.push(["更換圖片", function () {
                    console.log($element);
                }]);
            }


            $scope.pushMenu()

        }
    };
    return dazzleImage;
});