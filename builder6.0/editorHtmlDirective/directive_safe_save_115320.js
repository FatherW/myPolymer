var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element) {
            $scope.initRootHtml = function () {
                if (angular.isUndefined($scope.rootHtml) || $scope.rootHtml == null) {
                    $scope.getFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html').then(function (html) {
                        $scope.$apply(function () {
                            if (html.length < 5) {
                                $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                            } else {
                                $scope.rootHtml = html;
                            }
                            $scope.compile();
                        });
                    }, function (err) {
                        $scope.$apply(function () {
                            $scope.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html', $scope.rootHtml);
                            $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                            $scope.compile();
                        });
                    });
                }
            }();
            $scope.menuOptions = [
                ['編緝HTML', function () {
                    $scope.openCodePopup($scope.rootHtml, 'html').then(function (newCode) {
                        $scope.rootHtml = newCode;
                        $scope.compile();
                    });
                }],
                ['JS/Css 管理', function () {
                    $scope.openPageJsCssPopup($scope.thisPageJson).then(function (newThisPageJson) {
                        $scope.thisPageJson = newThisPageJson;
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', newThisPageJson);
                    });
                }]
            ];
            $scope.compile = function (stop) {
                setTimeout(function () {
                    $compile($element.contents())($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.rootHtml = $element.html();
                            if (angular.isUndefined(stop)) {
                                $scope.compile(null);
                            }
                        });
                    }, 500);
                }, 200);
            }
            $scope.updateRootHtml = function () {
                console.log('root html updated');
                $scope.rootHtml = $element.html();
                $scope.compile();
            }
            $scope.getRootHtml = function () {
                return $scope.rootHtml;
            }
        }
    };
    return editorHtmlDirective;
});