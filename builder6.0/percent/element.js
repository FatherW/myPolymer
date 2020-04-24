var app = angular.module('demoApp');
app.directive('percent', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var percent = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "percent";
            scope.type = "percent";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["更換百份比", function () {
                    console.log('Percent');
                    var percent = $element.attr('data-percent');
                        // Appending dialog to document.body to cover sidenav in docs app
                        var confirm = $mdDialog.prompt()
                          .title('這個百份比是?')
                          .placeholder('xxx%')
                        .initialValue(percent)
                          .ok('Okay!')
                          .cancel('Cancel');
                    
                        $mdDialog.show(confirm).then(function(result) {
                            $element.attr('data-percent',result);
                            alert('成功更新');
                        }, function() {
                        });
                }],
                ["更換項目", function () {
                    console.log('Item');
                    var item = $element.siblings('h3').text();
                        // Appending dialog to document.body to cover sidenav in docs app
                        var confirm = $mdDialog.prompt()
                          .title('這個項目是?')
                          .placeholder('item')
                        .initialValue(item)
                          .ok('Okay!')
                          .cancel('Cancel');
                    
                        $mdDialog.show(confirm).then(function(result) {
                            $element.siblings('h3').text(result);
                            alert('成功更新');
                        }, function() {
                        });
                }]
                
                
                
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return percent;
});