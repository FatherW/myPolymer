var app = angular.module('demoApp');
app.directive('dzSelectPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzSelectPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzSelectPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzSelectPopup";
            scope.type = "dzSelectPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.options = params.options;
                $scope.select = params.select;
                
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');


                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            
                $scope.save = function () {
                    $mdDialog.hide($scope.select);
                };
            
        }
    };
    return link;
});