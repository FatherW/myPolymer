var app = angular.module('demoApp');
app.directive('editorLinkElement', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var editorLinkElement = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "editorLinkElement";
            scope.type = "editorLinkElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.model.html = element.html();
            var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
            element.html(template);
            scope.$apply(function () {
                $compile(template)(scope);
            });                    
        },
        controller: function ($scope, $element, $attrs) {

			$scope.menuOptions = [
                ["編緝連結文字", function ($itemScope) {
                     var confirm = $mdDialog.prompt()
                      .title('更改連結文字')
                      .placeholder('諭輸入內容')
                      .initialValue($element.text())
                      .required(true)
                      .ok('OK')
                      .cancel('取消');
                
                    $mdDialog.show(confirm).then(function(result) {
							$element.find('a').text(result);
                    }, function() {

                    });
                }],
                ["更換連結", function () {
                    var params = {
                        "name":"dzLinkPopup",
                        "directive":"<dz-link-popup></dz-link-popup>"
                    }
                    $dazzlePopup.callPopup(params).then(function(result){
                       console.log(result); 
                       $element.find('a').attr('href',result.link);
							
                    });

                }]
            ];
        

        }
    };
    return editorLinkElement;
});