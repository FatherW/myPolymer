var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorHtmlDirective/directive.html"
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            $templateRequest(path + key + "?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $http, $element) {
            $scope.initRootHtml = function () {
                if (angular.isUndefined($scope.rootHtml) || $scope.rootHtml == null) {
                    $scope.getFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html').then(function (html) {
                        if (html.length < 5) {
                            $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                        } else {
                            $scope.rootHtml = html;
                        }
                    }, function (err) {
                        $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                        $scope.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html', $scope.rootHtml);
                    });
                }
            }();
            $scope.menuOptions = [
                ['編緝HTML', function () {
                    $scope.openCodePopup($scope.rootHtml, 'html').then(function (newCode) {
                        $scope.$apply(function () {
                            $scope.rootHtml = newCode;
                        });
                    });
                }],
                ['JS/Css 管理', function () {
                    $scope.openPageJsCssPopup($scope.thisPageJson).then(function (newThisPageJson) {
                        $scope.thisPageJson = newThisPageJson;
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', newThisPageJson);
                    });
                }]
            ];
        }
    };
    return editorHtmlDirective;
});