var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            $scope.pushMenu($scope, $element, $attrs, ["更換連結", function () {
                console.log($element);
            }]);
        }
    };
    return dazzleLink;
});