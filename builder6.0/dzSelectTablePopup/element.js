var app = angular.module('demoApp');
app.directive('dzSelectTablePopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzSelectTablePopup';
    var link = {
        restrict: 'E',
        require: '^dzSelectPopup',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzSelectTablePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.options = params.options;
                $scope.select = params.select;
        }
    };
    return link;
});