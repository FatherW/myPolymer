var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest, $uibModal, $mdDialog) {
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude: true,
        template: '<div context-menu="menuOptions" ng-transclude></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ['編緝Container', function () {
                    var container = angular.element("<div></div>").append($element);
                    $scope.openCodePopup(container.html(), 'html').then(function (newCode) {
                        var newHtml = angular.element("<div></div>").append(newCode);
                        newHtml.find('[ng-transclude]').contents().unwrap();
                        newHtml.find('[bind-html-compile]').contents().unwrap();
                        /*newHtml.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });*/
                        console.log(newHtml.html());
                        $element.html = newHtml.html();
                        setTimeout(function () {
                            angular.element(document.getElementById('editor-header')).scope().saveConAtom($scope.model.id);
                        }, 500);
                    });
                }],
            ];
        }
    }
    return editorContainerElement;
});