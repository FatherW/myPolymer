var app = angular.module('demoApp');
app.directive('editorHtmlElement', function ($compile, $templateRequest) {
    var editorHtmlElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: '<div id="root" bind-html-compile="rootHtml" context-menu="menuOptions"></div>',
        controller: function ($scope, $http, $element) {
            $scope.menuOptions = [
                ['編緝HTML', function () {
                    $scope.openCodePopup($('#root').html(), 'html').then(function (newCode) {
                        var element = angular.element("<div></div>").html(newCode);
                        element.find('[ng-transclude]').contents().unwrap();
                        element.find("[bind-html-compile]").contents().unwrap();
                        element.find("[bind-html-compile]").removeAttr('bind-html-compile');
                        element.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });
                        $scope.$apply(function () {
                            var rootHtml = angular.element("<div></div>").append(element.html());
                            rootHtml.find('[ng-transclude]').contents().unwrap();
                            rootHtml.find('[bind-html-compile]').contents().unwrap();
                            $scope.rootHtml = rootHtml.html();
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
        }
    };
    return editorHtmlElement;
});