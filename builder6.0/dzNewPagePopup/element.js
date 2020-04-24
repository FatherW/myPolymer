var app = angular.module('demoApp');


app.directive('dzNewPagePopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzNewPagePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzNewPagePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzNewPagePopup";
            scope.type = "dzNewPagePopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzlePopup,$dazzleData,$dazzleInit) {
             $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
                console.log('Page Json',$scope.pageJson);
                $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
                $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                $scope.init = function () {

                };
            
                $scope.addPage = function () {

                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                }
        }
    };
    return link;
});
