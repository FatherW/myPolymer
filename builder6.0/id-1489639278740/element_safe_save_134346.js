var app = angular.module('demoApp');
app.directive('masterJoe', function () {
    var url = "http://d27btag9kamoke.cloudfront.net/"
    var path = 'builder6.0/id-1489639278740/html/id-1489639278740.html';
    var master = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "html": $element.html()
                };
            }
            $scope.model = $scope.atom[$scope.id];
            //element init
        }
    }
    return master;
});