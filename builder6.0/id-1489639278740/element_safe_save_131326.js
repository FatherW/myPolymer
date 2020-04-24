var app = angular.module('demoApp');
app.directive('masterJoe', function ($ocLazyLoad) {
    var path = "http://d27btag9kamoke.cloudfront.net/builder6.0/id-1489639278740"
    var key = '/html/id-1489639278740.html';
    var master = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + key + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $scope.templateKey = key;
            $scope.templateUrl = master.templateUrl;

            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id
                };
            }
            $scope.model = $scope.atom[$scope.id];
            //element init
        }
    }
    return master;
});