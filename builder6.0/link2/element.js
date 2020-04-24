var app = angular.module('demoApp');

app.directive('link2', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var link = {
        restrict: 'A',
        scope: true,
        compile: function compile(element, attrs) {
            if (! attrs['compiled']) {
                element.attr('context-menu', 'menuOptions');
//                element.attr('bind-html-compile', 'model.html');
                element.attr('compiled', true);

                return  function (scope, element, attrs) {  
                            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
                            scope.directiveId = "link";
                            scope.type = "link";
                            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                            scope.templateUrl = scope.http + scope.templatePath;
                            $compile(element)(scope);
                };            
            }
        },
        link: function($scope,$element,$attrs) {
            console.log('link');
        
        },
        controller: function ($scope, $element, $attrs,$mdDialog) {
            $scope.editorCustomInit($scope, $element, $attrs).then(function () {
                console.log('controller',$scope.model);
            });


            $scope.menuOptions = [
                ["更換連結", function () {
                
                    var oldlink = $element.attr('href');
                      $scope.linkPopup($element, oldlink).then(function (result) {
                        $element.attr('href',result.link);
                        console.log($scope.model);
                    });
                }], 
                ["更換名稱", function () {
                      var confirm = $mdDialog.prompt()
                          .title('更改連結顯示名稱')
                          .textContent('請輸入名稱')
                          .initialValue($element.text())
                          .required(true)
                          .ok('OK')
                          .cancel('Cancel');

                        $mdDialog.show(confirm).then(function(result) {
                            $scope.model.html = result;
                            $element.html(result);

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
    return link;
});