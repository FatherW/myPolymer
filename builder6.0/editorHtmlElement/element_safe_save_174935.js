var app = angular.module('demoApp');
app.directive('editorHtmlElement', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorHtmlElement/element.html"
    var editorHtmlElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            $templateRequest(path + key + "?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $http, $element) {
            $scope.menuOptions = [
                ['編緝HTML', function () {
                    $scope.openCodePopup($('#root').html(), 'html').then(function (newCode) {
                        $('<div>' + newCode + '</div>').find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            console.log(id);
                            var html = $(element).find("[bind-html-compile]").html();
                            console.log(html);
                            if (!angular.isUndefined($scope.atom[id]) && !angular.isUndefined($scope.atom[id].html)) {
                                $scope.atom[id].html = html;
                            }
                        });
                        $scope.$apply(function () {
                            $scope.rootHtml = newCode;
                        });
                        setTimeout(function () {
                            angular.element(document.getElementById('editor-header')).scope().saveAtom();
                        }, 500);
                    });
                }],
                ['JS/Css 管理', function () {
                    $scope.openPageJsCssPopup($scope.thisPageJson).then(function (newThisPageJson) {
                        $scope.thisPageJson = newThisPageJson;
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', newThisPageJson);
                    });
                }]
            ];
            //console.log('editorHtmlElement init end');
        }
    };
    return editorHtmlElement;
});