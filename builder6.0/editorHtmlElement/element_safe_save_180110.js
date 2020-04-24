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
                        var ele = $("<div>" + newCode + "</div>");
                        ele.find("[bind-html-compile]").contents().unwrap();
                        ele.find("[bind-html-compile]").removeAttr('bind-html-compile');
                        ele.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });
                        $scope.$apply(function () {
                            $scope.rootHtml = ele.html();
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