var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.pushMenu($scope, $element, $attrs, ["更換連結", function () {
                $scope.linkPopup($element, $element.attr('href')).then(function (result) {
                    console.log(result);
                });
            }]);
            $scope.pushMenu($scope, $element, $attrs, ["更換名稱", function () {
                var confirm = $mdDialog.prompt()
                    .title('更改連結顯示名稱')
                    .textContent('請輸入名稱')
                    .initialValue($element.text())
                    .required(true)
                    .ok('OK')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function (result) {
                    console.log(result);
                });
            }]);
        }
    };
    return dazzleLink;
});