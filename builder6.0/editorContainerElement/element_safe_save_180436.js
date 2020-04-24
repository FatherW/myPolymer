var app = angular.module('demoApp');
app.directive('editorContainerElement', function ($compile, $templateRequest, $uibModal, $mdDialog) {
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
                    $scope.openCodePopup($element.children("[bind-html-compile]").html(), 'html').then(function (newCode) {
                        var ele = $("<div>" + newCode + "</div>");
                        ele.find("[bind-html-compile]").contents().unwrap();
                        ele.find("[bind-html-compile]").removeAttr('bind-html-compile');
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
                            html.append("<div class='col col-md-" + structure[i] + "'><editor-container-element></editor-container-element></div>")
                        }
                        console.log($scope.model.html);
                        console.log(html.html());
                        $scope.aaaaa = $scope.model.html + html.html();
                        console.log($scope.aaaaa);
                    });
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