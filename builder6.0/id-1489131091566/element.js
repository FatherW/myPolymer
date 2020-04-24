var app = angular.module('demoApp');
app.directive('mymy', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/id-1489131091566";
    var mymy = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + '/html/id-1489131091566.html' + '?id=' + new Date().getTime(),
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
            //element init
        }
    };
    return mymy;
});