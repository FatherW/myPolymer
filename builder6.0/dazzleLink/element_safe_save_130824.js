var app = angular.module('demoApp');
app.directive('dazzleLink', function ($compile) {
    var dazzleLink = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        compile: function compile(element, attrs) {
            return function (scope, element, attrs) {
                scope.http = "http://d27btag9kamoke.cloudfront.net/";
                scope.directiveId = "link";
                scope.type = "link";
                scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                scope.templateUrl = scope.http + scope.templatePath;
                $compile(element)(scope);
            };
        },
        controller: function ($scope, $element, $attrs, $mdDialog) {
            $scope.editorCustomInit($scope, $element, $attrs);
            $scope.pushMenu($scope, $element, $attrs, ["更換連結", function () {
                var oldlink = $element.attr('href');
                $scope.linkPopup($element, oldlink).then(function (result) {
                    $element.attr('href', result.link);
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
                    $scope.model.html = result;
                    $element.html(result);
                });
            }]);
        }
    };
    return dazzleLink;
});