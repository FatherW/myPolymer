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
                        $scope.unwrap(newHtml);
                        newHtml.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });
                        var id = $element.attr('id');
                        if ('master' in $attrs && !angular.isUndefined($scope.masterAtom[id])) {
                            $scope.masterAtom[id].html = newHtml.html();
                            $element.html(newHtml.html());
                            $compile($element)($scope);
                        } else {
                            $element.html(newHtml.html());
                            $compile($element)($scope);
                        }
                    });
                }],
                ['更換背景', function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/galleryPopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userGalleryPopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (image) {
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $element.css('background', 'url(' + 'http://' + $scope.exportBucket + '/' + image.key + ')');
                                $element.css('display', 'block');
                            });
                        });
                    });
                }],
                ["取消背景", function () {
                    $element.css('background', 'none');
                    $element.css('display', 'block');
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
                        $element.children('[context-menu]').eq(0).append(html);
                        $compile(html)($scope);
                    });
                }]
            ];
        }
    }
    return editorContainerElement;
});