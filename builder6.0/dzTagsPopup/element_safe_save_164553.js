var app = angular.module('demoApp');
app.directive('dzTagsPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzTagsPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzTagsPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzTagsPopup";
            scope.type = "dzTagsPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime(),
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                
                var params = $dazzleUser.getDazzleInfo('params');
                if (angular.isUndefined(params.value))
                    $scope.tags = [];
                else
                    $scope.tags = params.value;

                $scope.save = function () {
                    $mdDialog.hide($scope.tags);
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                }


        }
    };
    return link;
});