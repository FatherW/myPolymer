var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        compile: function (element, attrs) {
            if (angular.isUndefined(attrs['context-menu']) && element.closest('[context-menu]').length <= 0) {
                element.attr('context-menu', 'menuOptions');
                return function (scope, element, attrs) {
                    $compile(element)(scope);
                };
            }
        },
        controller: function ($scope, $element, $attrs) {
            console.log($scope);
            $scope.menuOptions = [["更換連結", function () {
                console.log($element);
            }]];
        }
    };
    return dazzleLink;
});