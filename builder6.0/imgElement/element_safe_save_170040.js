var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        /*compile: function ($element) {
         if (angular.isUndefined($element[0].id) || $element[0].id == null || $element[0].id.length < 1) {
         $element[0].id = "ele" + new Date().getTime();
         }
         },*/
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $scope.src = $element[0].src || "http://dazzle.gallery/img/logo.svg";
            $element[0].id = $scope.id;
            $element[0].src = $scope.src;
            //element init

            setTimeout(function () {
                $scope.src = "data:image/png;base64,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";
            })

            console.log($scope.id, $scope.src, $element);
        }
    }
    return imgElement;
});