var app = angular.module('demoApp');
app.directive('dataManagementPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleUser,$dazzleData,$dazzleFn) {
    var name = 'dataManagementPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dataManagementPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $uibModal,$mdDateLocale,$compile,$window,$mdToast,$ocLazyLoad,$dazzleS3,$dazzleFn,$mdBottomSheet,$dazzleUser,moment) {

            var websiteId = $dazzleUser.dazzleInfo['websiteId'];
            $scope.params = $dazzleUser.dazzleInfo['params'];
            $scope.tableName = $scope.params.tableName;
          //  $scope.gridOptions = $dazzleData.gridOptions(websiteId,$scope.tableName);
            console.log('dataManagement',$scope.params);

        }
    };
    return link;
});