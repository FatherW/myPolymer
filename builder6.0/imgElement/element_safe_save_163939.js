var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'AE',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html',
        compile: function () {
            console.log('imgElement compile');
        },
        controller: function ($scope, $element) {
            $ocLazyLoad.load(path + "element.css");
        }
    }
    return imgElement;
});