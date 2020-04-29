var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": "http://dazzle.gallery/img/logo.svg"
                };
            }
            console.log($scope.atom[$scope.id]);
            $scope.model = $scope.atom[$scope.id];
            console.log($scope.model);
            //element init
        }
    }
    return imgElement;
});