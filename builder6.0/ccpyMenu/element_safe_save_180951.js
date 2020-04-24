var app = angular.module('demoApp');
app.directive('ccpymenu', function ($compile, $templateRequest, $uibModal) {
    var path = "https://dazzle-template.s3.amazonaws.com/";
    var key = "builder6.0/ccpymenu/html/id-1490693164416.html";
    var ccpymenu = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpymenu loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpymenu loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpymenu init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-ccpymenu-element",
                    "menu": []
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpymenu</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpymenu init end');

            $scope.menuOptions = [
                ["編緝Menu", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'menuPopupCtrl',
                        size: 'lg',
                        resolve: {
                            menu: function () {
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.model.menu = menu;
                    });
                }]
            ];

            $scope.getRealHtml = function () {
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpymenu/html/1490693171394.html" + "?id" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.model.html = template[0].outerHTML;
                        console.log($scope.model.html);
                    }, 500);
                });
            };

            $scope.init = function () {
                $scope.getRealHtml();
            }();
        }
    };
    return ccpymenu;
});