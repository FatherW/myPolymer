var app = angular.module('demoApp');
app.directive('editorGooglemapElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var editorGooglemapElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorGooglemapElement";
            scope.type = "editorGooglemapElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.location)) {
                    scope.model.location = "香港科學園";
                    scope.model.src = "http://maps.google.com.hk/maps?f=q&hl=zh-HK&q=" + result + "&output=embed";
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions" class="paddingForMenu"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["更換地址", function () {
                    var confirm = $mdDialog.prompt()
                        .title('請輸入你的地址')
                        .textContent('例如：香港科學園')
                        .ariaLabel('locaion')
                        .placeholder('請輸入你的地址')
                        .initialValue($scope.model.location)
                        .ok('確定')
                        .cancel('取消');
                    $mdDialog.show(confirm).then(function (result) {
                        $scope.model.location = result;
                        $scope.model.src = "http://maps.google.com.hk/maps?f=q&hl=zh-HK&q=" + result + "&output=embed";
                        $scope.updateHtml();
                    });
                }]
            ];
        }
    };
    return editorGooglemapElement;
});