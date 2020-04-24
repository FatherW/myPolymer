var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest, $uibModal) {
    var bg;
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorContainerElement";
            scope.type = "editorContainerElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ['編緝Container', function () {
                    $element.find("[bind-html-compile]").contents().unwrap();
                    var modelHtml = $element.html();

                    $scope.openCodePopup("", 'html').then(function (newCode) {
                        var ele = $("<div>" + newCode + "</div>");
                        ele.find("[bind-html-compile]").contents().unwrap();
                        ele.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });
                        $scope.$apply(function () {
                            $scope.model.html = ele.html();
                        });
                        setTimeout(function () {
                            angular.element(document.getElementById('editor-header')).scope().saveAtom();
                        }, 500);
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
                                bg = 'http://' + $scope.exportBucket + '/' + image.key;
                                $('#' + $scope.model.id).css('background', 'url(' + bg + ')');
                                $('#' + $scope.model.id).css('display', 'block');
                            });
                        });
                    });
                }],
                ["取消背景", function () {
                    $('#' + $scope.model.id).css('background', 'none');
                    $('#' + $scope.model.id).css('display', 'block');
                }],

                ["新增元素", function () {
                    $scope.model.html = $scope.model.html + "<dazzle-row></dazzle-row>";
                    $scope.updateHtml();
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return editorContainerElement;
});