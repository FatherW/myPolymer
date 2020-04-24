var app = angular.module('demoApp');
app.directive('dzImage', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    atomInfo,dbFactory,userInfo) {
    var dzImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        compile: function (tElem, tAttrs) {
           return {
               pre: function (scope, iElem, iAttrs) {
                    iElem.attr('context-menu','menuOptions');
                 //    $dazzleInit.editorCustomInit(scope, iElem, iAttrs);
               },
               post: function (scope, iElem, iAttrs) {
                   console.log('Dz Image Load');
               }
           }
       },
        link: function ($scope, $element, attrs) {
            
            var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                console.log('dz image',$element);
                
                $scope.atom = atomInfo.atom[id];


        },
        controller: function ($scope, $element, $attrs) {
           
//           var dataParent = dbFactory.findDataParent($element);
//           $scope.table = dataParent['table'];
            $scope.getFileUrl = function (size, id) {
                    // return '';
                    //   return $dazzleFn.getFileUrl(size,id);
                    if (!id) {
                        return null;
                    }


                    if (id.indexOf(".jpg")>=0) {
                        id=id.replace(".jpg","");
                    }

                    return "//designerrrr-output.s3.amazonaws.com/images/"+userInfo.exportBucket+"/"+size+"/"+id+".jpg";
                   
                   
                }
                $.fn.hasAttr = function(name) {  
                   return this.attr(name) !== undefined;
                };
                        $scope.menuOptions = [

                            ["更換圖片", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                                var id = ele.attr('id');
                                $scope.atom = atomInfo.atom[id];
                                console.log('Change PIC',atomInfo.atom[id],id,$scope.atom);
                                var params = {
//                                    name: "dzUserGalleryPopup",
//                                    directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                                    name: 'dzImageGalleryPopup',
                                    directive: "<dz-image-gallery-popup></dz-image-gallery-popup>"
                                };
            
                                $dazzlePopup.callPopup(params).then(function(output){
                                    var url = $scope.getFileUrl('large-web',output.gid);
                                    console.log('URL',url);
                                      $element.attr('src',url);
                                        // var attr = $element.attr('data-id');
                                        
                                        // //$scope.atom['src'] = url;
                                        // console.log('My id',id,$scope.id);
                                        // if(atomInfo.checkIsData(id)) {
                                        //     var field = ele.attr('data-field') || null;
                                        //     atomInfo.atom[id]['data'][field] = url;
                                        // }
                                        // atomInfo.saveAtom(id,$scope.atom);
                                        
                                    //   console.log('Hi',attr);

                                    //   if (attr !== undefined){
                                    //       var table = $element.attr('data-table');
                                    //       var dataid = $element.attr('data-id');
                                    //       var field = $element.attr('data-field')
                                    //       dbFactory.dataset[table][dataid][field] = url;
                                    //       console.log('DB Dataset',dbFactory.dataset);
                                    //   }
                                        
                                      
                                },function(err){
                                    console.log('dz-image',err);
                                });
            
                            }]
                        ];

                     //atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
         
        }
    };
    return dzImage;
});