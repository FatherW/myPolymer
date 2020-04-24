var app = angular.module('demoApp');

app.directive('metalCompanyBall', function ($compile, $timeout, $mdDialog, $mdToast, $dazzleS3, $dazzleUser, $dazzlePopup) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var metalCompanyBall = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCompanyBall/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
  
         
        }
    };
    return metalCompanyBall;
}); 
 
 
