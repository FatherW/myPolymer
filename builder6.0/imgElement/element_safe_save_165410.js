var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'AE',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        compile: function ($element) {
            if (angular.isUndefined($element[0].id) || $element[0].id == null || $element[0].id.length < 1) {
                $element[0].id = "ele" + new Date().getTime();
            }
        },
        controller: function ($scope, $element, $attrs) {
            $scope.src = $attrs.src || "http://dazzle.gallery/img/logo.svg";
            console.log('imgElement controller', $element);
        }
    }
    return imgElement;
});