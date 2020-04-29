var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($ocLazyLoad) {
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
            }).subscribe('editableInput', function (event, editable) {
                console.log('editor-html-directive content changed');
            });
            $ocLazyLoad.load(path + "directive.css");
            $ocLazyLoad.load("css/medium-editor-theme.min.css");
            $scope.$watch('rootHtml', function () {
                console.log('rootHtml');
            })
            $scope.menuOptions = [
                ['編緝HTML', function ($itemScope) {
                    $scope.openCodePopup($scope.rootHtml, 'html').then(function (newCode) {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html', newCode);
                        $scope.rootHtml = newCode;
                    });
                }]
            ];
            $scope.getRootHtml = function () {
                $scope.getJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html').then(function (html) {
                    $scope.$apply(function () {
                        $scope.rootHtml = html;
                    });
                }, function (err) {
                    $scope.$apply(function () {
                        $scope.rootHtml = "<br><br><br><p style='text-align: center;'>hello world - " + new Date().getTime() + "</p><br><br><br>";
                    });
                });
            }();
        }
    };
    return editorHtmlDirective;
});