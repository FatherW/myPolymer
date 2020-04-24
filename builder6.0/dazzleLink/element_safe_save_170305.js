var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            console.log('dazzleLink', 'link', element);
        },
        controller: function ($scope, $element, $attrs) {
            if ($element.closest('[context-menu]').length <= 0 && angular.isUndefined($element.attr('context-menu'))) {
                $scope.menuOptions = [];
                $element.attr('context-menu', 'menuOptions');
                $compile($element)($scope);
            } else {
                console.log('menuOptions', $scope.menuOptions);
                $scope.menuOptions.push(["更換連結", function () {
                    console.log($element);
                }]);
            }
        }
    };
    return dazzleLink;
});