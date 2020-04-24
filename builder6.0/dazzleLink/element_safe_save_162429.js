var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            if (angular.isUndefined(element.attr('context-menu'))) {
                element.attr('context-menu', 'menuOptions');
                scope.menuOptions = [];
                $compile(element)(scope);
            }
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.menuOptions = [
                ["更換連結", function () {
                    var oldlink = $element.attr('href');
                    $scope.linkPopup($element, oldlink).then(function (result) {
                        $element.attr('href', result.link);
                    });
                }]
            ];
        }
    };
    return dazzleLink;
});