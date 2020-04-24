var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/editorHtmlDirective/directive.html"
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            console.log('editorHtmlDirective loading start');
            $templateRequest(path + key + "?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                console.log('editorHtmlDirective loading end');
            });
        },
        controller: function ($scope, $http, $element) {
            console.log('editorHtmlDirective init start');
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
                    $scope.openCodePopup($('#root').html(), 'html').then(function (newCode) {
                        //var newRoot = angular.element(newCode);
                        //console.log(newRoot);
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
            console.log('editorHtmlDirective init end');
        }
    };
    return editorHtmlDirective;
});