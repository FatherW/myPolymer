var app = angular.module('demoApp');
app.directive('dzTest2', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzTest2 = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzTest2/element.html?id=" + new Date().getTime(),
        // template: `<div ng-bind-html="model.html" context-menu="menuOptions"></div>`,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzTest2";
            scope.type = "dzTest2";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
          
           $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {

    
                   element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    $compile(element.contents())(scope);



             });
        },
        controller: function ($scope, $element, $attrs) {
            //$dazzleInit.featherEditorInit($scope);
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                }],
                ["更換圖片", function () {
                    var params = {
                        name: "dzUserGalleryPopup",
                        directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){

                        $scope.model.src = $dazzleFn.getFileUrl('large-web',output.gid);
                        $dazzleInit.useTemplate($scope);
                    });

                }]
            ];

        }
    };
    return dzTest2;
});