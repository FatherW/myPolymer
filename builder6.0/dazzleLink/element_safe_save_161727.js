var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            if (element.closest('[context-menu]').length < 0) {
                if (angular.isUndefined(element.attr('context-menu'))) {
                    element.attr('context-menu', 'menuOptions');
                    $compile(element)(scope);
                }
                if (angular.isUndefined(scope.menuOptions)) {
                    scope.menuOptions = [];
                }
            }
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.menuOptions = $scope.menuOptions.concat([
                ["更換連結", function () {
                    var oldlink = $element.attr('href');
                    $scope.linkPopup($element, oldlink).then(function (result) {
                        $element.attr('href', result.link);
                    });
                }]
            ]);
        }
    };
    return dazzleLink;
});