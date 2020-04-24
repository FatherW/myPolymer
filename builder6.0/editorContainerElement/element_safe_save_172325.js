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
                    var container = angular.element("<div></div>").append($element.html());
                    $scope.openCodePopup(container.html(), 'html').then(function (newCode) {
                        var newHtml = angular.element("<div></div>").append(newCode);
                        newHtml.find('[ng-transclude]').contents().unwrap();
                        newHtml.find('[bind-html-compile]').contents().unwrap();
                        newHtml.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });
                        $element.html(newHtml.html());
                        $compile($element)($scope);
                    });
                }],
                ["新增結構", function () {
                    $mdDialog.show({
                        templateUrl: 'models/addStructurePopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'addStructurePopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (structure) {
                        var html = angular.element("<div class='row'></div>");
                        for (var i = 0; i < structure.length; i++) {
                            html.append("<div class='col col-md-" + structure[i] + "'><editor-container-element>" + "Container" + "[" + i + "]" + "</editor-container-element></div>")
                        }
                        console.log(html.html());
                    });
                }]
            ];
        }
    }
    return editorContainerElement;
});