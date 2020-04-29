var app = angular.module('demoApp');
app.directive('dazzleData', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleData";
            scope.type = "dazzleData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編輯資料", function () {
                    $mdDialog.show({
                        controller: "dataPopupController",
                        templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                        clickOutsideToClose: fasle,
                    })
                        .then(function (answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            $scope.status = 'You cancelled the dialog.';
                        });
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'dataPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {

                    });
                }],
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleData;
});