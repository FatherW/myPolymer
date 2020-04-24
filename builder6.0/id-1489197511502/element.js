var app = angular.module('demoApp');

app.directive('editorTab', function ($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/id-1489197511502";
    var editortab = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + '/html/id-1489197511502.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.currentNavItem = 'page1';
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "link": "#",
                    "html": "<div>hello world</div>"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.menuOptions2 = [
                ["下一頁", function ($itemScope) {
                      $scope.currentNavItem = 'page1';
                }],
                ["上一頁", function ($itemScope) {
                      $scope.currentNavItem = 'page2';
                }]
            ];

                
            $element[0].addEventListener("DOMSubtreeModified", function () {
                console.log('DOM changed');
            });
            //element init
        }
    }
    return editortab;
});

