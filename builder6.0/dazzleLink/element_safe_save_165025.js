var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            console.log('dazzleLink', 'link', element);
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            console.log($element.closest('[context-menu]').length < 0, angular.isUndefined($element.attr('context-menu')), $element);
            if ($element.closest('[context-menu]').length < 0 && angular.isUndefined($element.attr('context-menu'))) {
                $scope.menuOptions = [];
                $element.attr('context-menu', 'menuOptions');
                console.log('before compile');
                $compile($element)(scope);
                console.log('after compile');
            } else {
                console.log('menuOptions', $scope.menuOptions);
                $scope.menuOptions.push(["更換連結", function () {
                    var oldlink = $element.attr('href');
                    $scope.linkPopup($element, oldlink).then(function (result) {
                        $element.attr('href', result.link);
                    });
                }]);
            }
        }
    };
    return dazzleLink;
});