var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var editorImageElement = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d27btag9kamoke.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorImageElement";
            scope.type = "editorImageElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {
                
                console.log('Load Image',element);
//                element.attr('atom',true);
                if (angular.isUndefined(scope.model.src)) {
                    scope.model.link="#";
                    if (!angular.isUndefined(element.attr('src')) && element.attr('src')) {
                        scope.model.src = element.attr('src');
                    } else {
                        scope.model.src = "http://dazzle.website/image/lgo.png";
                    }
                }

                if (element.attr('field') &&
                    scope.thisPageJson &&
                    scope.thisPageJson.exportDatas &&
                    scope.thisPageJson.exportDatas[element.attr('field')]) {
                    scope.model.src = scope.thisPageJson.exportDatas[element.attr('field')];
                    scope.useTemplate();
                } 
                
                if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $dazzleData.loadRecord(scope.model.db).then(function(record){
                        var rec = record[0];
                        scope.model.src = rec[scope.model.db.field]; 
                        var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                        element.html(template);
                        scope.$apply(function () {
                            $compile(template)(scope);
                        });
                        
                    });
                    
                    //scope.useTemplate();
                } else {
                    var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    element.html(template);
                    scope.$apply(function () {
                        $compile(template)(scope);
                    });                    
                }


            });
        },
        controller: function ($scope, $element, $attrs) {
            $dazzleInit.featherEditorInit($scope);
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                //                    $dazzleInit.featherEditor.scope = $scope;
                    $dazzleInit.featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    var params = {
                        name: "userGalleryPopup",
                        directive:"<user-gallery-popup></user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        //var image = output['image'];
                        // var image = output;
                        // console.log($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key);
                        // $dazzleInit.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
                        //     $scope.$apply(function () {
                        //         $scope.model.src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
                        //         $dazzleInit.useTemplate($scope);
                        //     });
                        // });

                        $scope.model.src = $dazzleFn.getFileUrl('big-web',output.gid);
                        $dazzleInit.useTemplate($scope);
                    });

                }], ["管理鏈結", function () {
                
                    var params = {
                        name:"linkPopup",
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
                    var params = {
                        "name": 'templatePopup',
                        "directive": '<template-popup></template-popup>',
                        'model': $scope.model
                    };

                    $dazzlePopup.callPopup(params).then(function(template){
                        console.log(template);
                        $scope.loadData();
                        if (!angular.isUndefined($scope.model.db))
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
                    });

                }], ["刪除", function () {
                    $element.remove();
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
    return editorImageElement;
});