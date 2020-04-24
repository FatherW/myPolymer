var app = angular.module('demoApp');
    app.directive('adminChangePassword', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3,  $dazzleUser, $dazzlePopup) {
      // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
      // $scope.thisPage => $scope.pagename
      // $scope.websiteKey => 'website/'+$scope.hostname;

      var adminDashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/adminChangePassword/element.html?id=" + new Date().getTime(),
        controller: function($scope, $http, $element, $timeout, $ocLazyLoad,$mdSidenav) {


        }
      };
      return adminDashboard;
    });







//});