var app = angular.module('demoApp');
app.directive('dazzleEditItem', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleEditItem = {
        restrict: 'AE',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleEditItem";
            scope.type = "dazzleEditItem";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },
        controller: function ($scope, $element, $attrs) {
           if (!angular.isUndefined($element.attr('field')) && $element.attr('field')) {
                console.log($element.attr('field'));
                //$scope.model.field = $element.attr('field');
                $element.html($scope.thisPageJson.exportDatas[$element.attr('field')]);
            } 
            $compile($element.contents())($scope);

            $scope.menuOptions = [
                ["對應資料欄", function () {
                            // Appending dialog to document.body to cover sidenav in docs app
                            var confirm = $mdDialog.prompt()
                              .title('What is your field?')
                              .placeholder('Field Name')
                              .ok('輸入')
                              .cancel('取消');
                        
                            $mdDialog.show(confirm).then(function(result) {
                              $scope.model.field = result;
                                $scope.model.value = $element.text();
                                console.log($scope.model);                                
                            }, function() {
                              $scope.status = '沒有對應的欄位，資料不獲儲存';
                            });

                    console.log("Menu Clicked:dazzleEditItem");
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
    return dazzleEditItem;
});