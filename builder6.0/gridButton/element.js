var app = angular.module('demoApp');
app.directive('gridButton', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var gridButton = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/gridButton/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {

        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["gridButton", function () {
                    console.log("Menu Clicked:gridButton");
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
    return gridButton;
});