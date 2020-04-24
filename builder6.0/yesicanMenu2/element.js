var app = angular.module('demoApp');
app.directive('yesicanMenu2', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/yesicanMenu2/";
    var directiveName = "yesicanMenu2";
    var yesicanMenu2 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('yesicanMenu2 loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('yesicanMenu2 loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('yesicanMenu2 init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-yesicanMenu2-element",
                    "menu":[
                        {
                        "title":"項目一",
                        "link":"#",
                        "list":[]
                        },{
                        "title":"項目二",
                        "link":"#",
                        "list":[]
                        },{
                        "title":"項目三",
                        "link":"#",
                        "list":[]
                        },]
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>yesicanMenu2</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('yesicanMenu2 init end');

            $scope.menuOptions = [
                ["編緝Menu", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'menuPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            },
                            menu: function () {
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
                        $scope.model.menu = menu;
                        $scope.getRealHtml();
                    });
                }]
            ];

            $scope.getRealHtml = function () {
                $templateRequest(http+path+"html/template.html" + "?id" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = template[0].outerHTML
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");
                        });
                    }, 500);
                });
            };

            $scope.init = function () {
                $scope.getRealHtml();
            }();

        }
    };
    return yesicanMenu2;
});