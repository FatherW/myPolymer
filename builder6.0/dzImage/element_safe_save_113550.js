var app = angular.module('demoApp');
app.directive('dzImage', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzImage";
            scope.type = "dzImage";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.myElement = element;
            $dazzleFn.editorCustomInit(scope,element, attrs).then(function (object) {
                       var content = element[0].outerHTML;
                        console.log('dz Image Content',content);
                        content = content.replace('dz-image','dummy');
                        var src = element.attr('src');
                        var id = element.attr('id');
                        var html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<div class="dz-panel-content" context-menu="menuOptions">'+content+'</div></panel>';
                        var e = $compile(html)(scope);
                        element.replaceWith(e);
            });    
                 
//                    element.html($dazzleUser.dazzleInfo['toolbar']+'<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
//                    $compile(element.contents())(scope);         
                 
 //            });
            
                      
        },
        controller: function ($scope, $element, $attrs) {
           
                        $scope.menuOptions = [
                            ["編緝圖片", function () {
                            //                    $dazzleInit.featherEditor.scope = $scope;
                              // $dazzleInit.featherEditor.launch({
                            //        image: 'img' + '-' + $scope.model.id,
                             //       url: $scope.model.src
                              //  });
                            }],
                            ["更換圖片", function () {
                                var params = {
                                    name: "dzUserGalleryPopup",
                                    directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                                };
            
                                $dazzlePopup.callPopup(params).then(function(output){
                                    var url = $dazzleFn.getFileUrl('large-web',output.gid);
                                    $scope.model.src = url;
                                    $scope.model.data = url;
                                    $dazzleFn.useTemplate($scope.model);
                                },function(err){
                                    console.log('dz-image',err);
                                });
            
                            }], 
                             ["資料管理", function () {
                    
                   
                                var params = {
                                    db:$scope.model.db|| {},
                                    'directive':'<db-setting-popup></db-setting-popup>'
                                    
                                };
                                $dazzlePopup.callPopup(params).then(function(result){
                                    console.log(result);
                                    
                                    if(result === null) {
                                        $scope.model.isDb = false;
                                        $scope.model.db = {}; 
                                    } else {
                                        $scope.model.isDb = true;
                                        $scope.model.db = result; 
                                    }
                                    
                                    console.log('Dz Image Atom',$scope.model);

                                    $dazzleFn.useTemplate($scope);                                        

                                    
                                },function(err){

                                });
                                
                            }],["刪除", function () {
                                $element.remove();
                            }]
                        ];

         
        }
    };
    return dzImage;
});