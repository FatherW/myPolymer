var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorHtmlDirective/";
    var editorHtmlDirective = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element) {
            var editor = new MediumEditor('editor-html-directive', {
                autoLink: true,
                buttonLabels: 'fontawesome',
                placeholder: false,
                toolbar: {
                    buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                }
            }).subscribe('editableInput', function (event, element) {
                $scope.rootHtml = angular.element(element).html();
            });
            $ocLazyLoad.load(path + "directive.css");
            $ocLazyLoad.load("css/medium-editor-theme.min.css");
            $scope.menuOptions = [
                ['編緝HTML', function ($itemScope) {
                    $scope.openCodePopup($scope.rootHtml, 'html').then(function (newCode) {
                        $scope.rootHtml = newCode;
                        $compile($element)($scope);
                    });
                }]
            ];
            $scope.getRootHtml = function () {
                if (angular.isUndefined($scope.rootHtml)) {
                    console.log('getRootHtml');
                    $scope.getFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html').then(function (html) {
                        $scope.$apply(function () {
                            $scope.rootHtml = html;
                        });
                    }, function (err) {
                        $scope.$apply(function () {
                            $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                        });
                    });
                }
            }();
            $scope.$watch('rootHtml', function (newValue, oldValue) {
                if (!angular.isUndefined(newValue) && newValue !== oldValue) {
                    //$scope.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html', $scope.rootHtml);
                    console.log('rootHtml changed', $scope.rootHtml);
                }
            });
        }
    };
    return editorHtmlDirective;
});