var app = angular.module('demoApp');
app.directive('menuElement', function($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/menuElement/";
    var menuElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        controller: function($scope, $element, $attrs, $timeout, $uibModal) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
                ['編輯選單', function($itemScope, node) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/menuPopup.html?id=' + Math.floor((Math.random() * 10000) + 1),
                        controller: 'menuCtrl',
                        size: 'lg',
                        resolve: {
                            list: function() {
                                return $itemScope.model.list;
                            },
                            data: function() {
                                return $itemScope.data;
                            }
                        }
                    });
                    modalInstance.result.then(function(list) {
                        $itemScope.model.list = list;
                        $scope.updateHtml();
                    });
                }]
            ];
            $scope.updateHtml = function() {
                    $templateRequest(menuelement.templateUrl).then(function(html) {
                        var template = angular.element(html);
                        var compiledElement = $compile(template)($scope);
                        $timeout(function() {
                            $scope.model.html = compiledElement.html()
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, '')
                                .replace(/<!--(.*?)-->/gm, "");
                            console.log('Update HTML', $scope.model.html);
                        }, 500);
                    });
                }
                //element init
        }
    }
    return menuElement;
});

app.controller('menuCtrl', function ($scope, $uibModalInstance, list, data) {
    $scope.data = data;//for anchor
    $scope.list = list || [];
    $scope.newRootItem = function () {
        var id = new Date().getTime();
        $scope.list.push({
            id: 'menu' + id,
            title: "新項目",
            link: "#",
            type: 'Menu',
            list: []
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveMenu = function () {
        console.log($scope.list);
        $uibModalInstance.close($scope.list);
    };

    $scope.saveLink = function (node, link) {
        node.link = link;
    };

    $scope.newSubItem = function (node) {
        var id = new Date().getTime();
        node.list.push(
            {
                id: 'submenu' + id,
                title: "新項目",
                link: "#",
                type: 'Menu',
                list: []
            }
        );
    };

    $scope.removeHandle = function (node) {
        delete node;
    };
});