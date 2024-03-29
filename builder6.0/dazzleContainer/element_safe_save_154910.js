var app = angular.module('demoApp');
app.directive('dazzleContainer', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleContainer = {
        restrict: 'E',
        priority: 1000,
        transclude: true,
        scope: true,
        template: '<div context-menu="menuOptions"><ng-transclude></ng-transclude></div>',
        controller: function ($scope, $element, $attrs) {
            console.log('Load Dazzle Container Controller');
            $scope.menuOptions = [
                ['編緝Container', function () {
                    $scope.openCodePopup($element.children("[bind-html-compile]").html(), 'html').then(function (newCode) {
                        //console.log($scope.id + "Container:", "code saved");
                        var ele = $("<div>" + newCode + "</div>");
                        ele.find("[bind-html-compile]").contents().unwrap();
                        ele.find("[bind-html-compile]").removeAttr('bind-html-compile');
                        //console.log($scope.id + "Container:", "bind-html-compile removed");
                        ele.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                                //console.log($scope.id + "Container:", "atom" + index + " html updated");
                            }
                        });
                        $scope.$apply(function () {
                            $scope.model.html = ele.html();
                        });
                        setTimeout(function () {
                            angular.element(document.getElementById('editor-header')).scope().saveConAtom($scope.model.id);
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
                                var bg = 'http://' + $scope.exportBucket + '/' + image.key;
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
                            html.append("<div class='col col-md-" + structure[i] + "'><dazzle-container></dazzle-container></div>")
                        }
                        $scope.model.html = $scope.model.html + html.html();
                    });
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleContainer;
});