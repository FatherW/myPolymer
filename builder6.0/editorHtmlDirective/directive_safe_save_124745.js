var app = angular.module('demoApp');
app.directive('editorHtmlDirective', function ($compile, $uibModal, $ocLazyLoad) {
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
            $scope.menuOptions = [
                ['編緝HTML', function ($itemScope) {
                    $scope.$apply(function () {
                        $scope.rootHtml = "hello world" + new Date().getTime();
                    });
                }]
            ];
            $scope.getRootHtml = function () {
                $scope.getJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/root.json').then(function (html) {
                    $scope.$apply(function () {
                        $scope.rootHtml = html;
                    });
                }, function (err) {
                    $scope.$apply(function () {
                        $scope.rootHtml = "<editor-html-directive ng-bind-html="rootHtml | to_trusted" context-menu="menuOptions" class="ng-binding ng-scope medium-editor-element" contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="bfee9c77-9460-d73c-3bb6-f91d14e1a7d8" data-medium-focused="true"><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>";
                    });
                });
            }();
        }
    };
    return editorHtmlDirective;
});