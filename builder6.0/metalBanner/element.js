var app = angular.module('demoApp');

app.directive('metalBanner', function ($compile, $timeout, $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var metalHeader = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalBanner/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {

        }
    };
    return metalHeader;
}); 
 





