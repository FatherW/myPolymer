var app = angular.module('demoApp');
app.directive('dzNumberPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzNumberPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzNumberPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzNumberPopup";
            scope.type = "dzNumberPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime(),
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                var params = $dazzleUser.getDazzleInfo('params');
                
                $scope.value = params.value;

                $scope.save = function () {
                    $mdDialog.hide($scope.value);
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                }


        }
    };
    return link;
});