var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            //console.log('dazzleImage', 'controller');
            /*if ($element.closest('[context-menu]').length <= 0 && angular.isUndefined($element.attr('context-menu'))) {
                $scope.menuOptions = [];
                $element.attr('context-menu', 'menuOptions');
                console.log('dazzleImage', 'compile');
                $compile($element)($scope);
            } else {
                console.log('dazzleImage', 'menuOptions');
                $scope.menuOptions.push(["更換圖片", function () {
                    console.log($element);
                }]);
            }*/
        }
    };
    return dazzleImage;
});