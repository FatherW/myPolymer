var app = angular.module('demoApp');
app.directive('kpleeSuntaMenu', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/kpleeSuntaMenu/";
    var directiveName = "kpleeSuntaMenu";
    var kpleeSuntaMenu = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeSuntaMenu loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('kpleeSuntaMenu loading end');
        },
        controller: function ($scope, $element, $attrs,$uibModal) {
            //console.log('kpleeSuntaMenu init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
            	var id = new Date().getTime();
                $scope.atom[$scope.id] = {
                    "id": $scope.id, 
                    "type": "kpleeSuntaMenu",
                    "menu": [
                    	{
            				id: 'menu' + id,
            				title: "新項目",
            				link: "#",
            				type: 'Menu',
            				list: []
        				}
                    ]
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeSuntaMenu</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeSuntaMenu init end');
            $scope.menuOptions = [
                ["編緝Menu", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/menuNewPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'menuNewPopupCtrl',
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
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/kpleeSuntaMenu/html/element.html" + "?id" + new Date().getTime()).then(function (html) {
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
    return kpleeSuntaMenu;
});