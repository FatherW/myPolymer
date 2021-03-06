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
                if (angular.isUndefined(scope.model.youtubeId)) {
                    scope.model.src = "https://www.youtube.com/embed/L0MK7qz13bU";
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions" class="paddingForMenu"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["editorYoutubeElement", function () {
                    var confirm = $mdDialog.prompt()
                        .title('請輸入你的Youtube URL')
                        .textContent('例如：https://www.youtube.com/watch?v=L0MK7qz13bU')
                        .ariaLabel('youtubeUrl')
                        .placeholder('請輸入你的Youtube URL')
                        .initialValue($scope.model.src)
                        .ok('確定')
                        .cancel('取消');
                    $mdDialog.show(confirm).then(function (result) {
                        $scope.model.src = "https://www.youtube.com/embed/" + $scope.getYouTubeID(result);
                        $scope.updateHtml();
                    });
                }]
            ];
            $scope.getYouTubeID = function (url) {
                var ID = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    ID = url[2].split(/[^0-9a-z_\-]/i);
                    ID = ID[0];
                } else {
                    ID = url;
                }
                return ID;
            }
        }
    };
    return editorYoutubeElement;
});