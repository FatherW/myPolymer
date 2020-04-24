var app = angular.module('demoApp');
app.directive('dazzleImage', function ($compile) {
    var dazzleImage = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            $scope.pushMenu($scope, $element, $attrs, ["更換圖片", function () {
                console.log(element);
            }]);
        }
    };
    return dazzleImage;
});