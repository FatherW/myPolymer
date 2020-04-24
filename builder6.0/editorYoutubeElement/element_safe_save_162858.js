var app = angular.module('demoApp');
app.directive('editorYoutubeElement', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var editorYoutubeElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorYoutubeElement";
            scope.type = "editorYoutubeElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions" class="paddingForMenu"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["editorYoutubeElement", function () {
                    var confirm = $mdDialog.prompt()
                        .title('請輸入你的youtube')
                        .textContent('URL/ID')
                        .ok('確定')
                        .cancel('取消');
                    $mdDialog.show(confirm).then(function (result) {
                        console.log(result);
                    });
                }]
            ];
            $scope.beforeAtomSaved = function () {
                console.log('beforeAtomSaved');
            }
            $scope.afterAtomSaved = function () {
                console.log('afterAtomSaved');
            }
        }
    };
    return editorYoutubeElement;
});