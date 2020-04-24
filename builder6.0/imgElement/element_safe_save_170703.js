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
            $scope.src = $element[0].src || "http://dazzle.gallery/img/logo.svg";
            $element[0].id = $scope.id;
            $element[0].src = $scope.src;

            //img init
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src
                };
            }
            //img init
            $scope.model = $scope.atom[$scope.id];
            console.log($scope.model);
            //element init

            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.model.src = "http://www.img-corp.com/images/logo@2x.png";
                });
                console.log('seted');
            }, 5000);

            console.log($scope.id, $scope.src, $element);
        }
    }
    return imgElement;
});