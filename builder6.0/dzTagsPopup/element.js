var app = angular.module('demoApp');
app.directive('dzTagsPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzTagsPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzTagsPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.tags = params.tags;
                console.log('Tags',params);
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