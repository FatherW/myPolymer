var app = angular.module('demoApp');
app.directive('htmlImage', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData) {
    var htmlImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "htmlImage";
            scope.type = "htmlImage";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                

                
                if (angular.isUndefined(scope.model.src)) {
                    scope.model.link="#";
                    if (!angular.isUndefined(element.attr('src')) && element.attr('src')) {
                        scope.model.src = element.attr('src');
                    } else {
                        scope.model.src = "http://dazzle.website/image/lgo.png";
                    }
                }

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });

            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    $scope.featherEditor.scope = $scope;
                    $scope.featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    var params = {
                        directive:"<user-gallery-popup></user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        //var image = output['image'];
                        var image = output;
                        console.log($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key);
                        $scope.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
                                $scope.useTemplate();
                            });
                        });
                    
                    });

                }], ["管理鏈結", function () {
                
                    var params = {
                        element: $element,
                        oldLink: $scope.model.link,
                        directive:"<link-popup></link-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {
                        console.log(output);
                        $scope.model.link = output['link'];
                        console.log($scope.model.link);
                        $scope.useTemplate();
                    });     
                    

                    
//                    $scope.linkPopup(null, $scope.model.link).then(function (result) {
//                        $scope.model.link = result.link;
//                    });
                }], ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]
            ];
            //            console.log('Field');
//                console.log('Field',$element.attr('field'));
//                console.log($scope.thisPageJson);


            $scope.beforeAtomSaved = function () {
                if ($element.attr('field') &&
                    $scope.thisPageJson &&
                    $scope.thisPageJson.exportDatas &&
                    $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                        var field = $element.attr('field');
                        $scope.thisPageJson.exportDatas[field] = $scope.model.src;
                }
                
                if (!angular.isUndefined($scope.model.db)){
                    //var db
                    $dazzleData.saveRecord($scope.model.db,$scope.model.src).then(function(){
                        console.log('Saved');
                    });
                }
            }
        }
    };
    return htmlImage;
});