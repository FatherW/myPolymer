var app = angular.module('demoApp');
app.directive('dazzleCol66', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleCol66 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        replace:true,
        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dazzleCol66/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["dazzleCol66", function () {
                    console.log("Menu Clicked:dazzleCol66");
                }]/*,
                 ["更換模版", function () {
                 $mdDialog.show({
                 controller: 'templatePopupController',
                 templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                 locals: {
                 rootScope: $scope
                 }
                 }).then(function (template) {
                 $scope.useTemplate();
                 });
                 }]*/
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleCol66;
});