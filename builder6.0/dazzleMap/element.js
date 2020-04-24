var app = angular.module('demoApp');

app.directive('dazzleMap', function ($compile, $templateRequest, $mdDialog, $uibModal,$sce) {


    var dazzleMap = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleMap";
            scope.type = "dazzleMap";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.src)) {
                 scope.model.src = scope.trustedSrc("香港科學園");
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.trustedSrc = function() {
                return $sce.trustAsResourceUrl($scope.model.src);
              }
            $scope.menuOptions = [
                ["輸入地址", function () {
                     var confirm = $mdDialog.prompt()
                          .title('請輸入地址')
                          .textContent('Google地圖會自動更新')
                          .placeholder('地址')
                          .initialValue('香港科學園')
                          .ok('Okay!')
                          .cancel('');
                    
                        $mdDialog.show(confirm).then(function(result) {
                            $scope.model.src = $scope.trustSrc(prefix+result);
                            $scope.updateHtml();
                        }, function() {
                            
                        });

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
    return dazzleMap;
});