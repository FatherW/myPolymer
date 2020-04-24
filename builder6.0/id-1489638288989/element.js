var app = angular.module('demoApp');
app.directive('suntaFooter', function ($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/id-1489638288989";
    var suntaFooter = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + '/html/id-1489638288989.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
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
            $scope.imgMenuOptions = [
                ["Menu", function ($itemScope) {
                    console.log('Menu clicked');
                }]
            ];
            $element[0].addEventListener("DOMSubtreeModified", function () {
                console.log('DOM changed');
            });
            //element init
        }
    }
    return suntaFooter;
});