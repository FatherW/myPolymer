var app = angular.module('demoApp');
app.directive('dzImg', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzImg = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzImg";
            scope.type = "dzImg";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
 
              console.log('Load Src',element.attr('src'));
              console.log('Load Image',element);
               element.on('mouseenter', function() {
//                      console.log('Height',element.children('div')[0].offsetHeight);
                    // element.css('position','relative');
                    // element.css('display','block');
                    height = element.children('div')[0].offsetHeight;
                    width = element.children('div')[0].offsetWidth;
                    
                    element.children('div').append('<div class="dz-overlay"></div>');
                    element.find('.dz-overlay').css('width',width);
                    element.find('.dz-overlay').css('height',height);
                });
    
                element.on('mouseleave', function() {
                    element.find('.dz-overlay').remove();
                });
          
           $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {

                 console.log('Load Image',element);
                 console.log(scope.model);
                 
// //                element.attr('atom',true);
//                 console.log('My Scope',scope);
    

                    if (angular.isUndefined(scope.model.src)) {
                        scope.model.link="#";
                        if (!angular.isUndefined(element.attr('src')) && element.attr('src')) {
                            scope.model.src = element.attr('src');
                        } else {
                            scope.model.src = "http://dazzle.website/image/lgo.png";
                        }
                    }
                    element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    $compile(element.contents())(scope);

             });
        },
        controller: function ($scope, $element, $attrs) {
           

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
    return dzImg;
});