var app = angular.module('demoApp');
app.directive('dzBg', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn
,dzFn) {
    var dzImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        compile: function (tElem, tAttrs) {
           return {
               pre: function (scope, iElem, iAttrs) {
//                    iElem.attr('context-menu','menuOptions');
//                     $dazzleInit.editorCustomInit(scope, iElem, iAttrs);
                //   var menu= new Contextmenu({
                // 		name:"menu",
                //         wrapper:".bg",
                //         trigger: ".context-menu",
                //         item:[{
                //                 "name":"Click Event",
                //                 "func":"setText()",
                //                 "link":null,
                //                 "disable":false
                //               },
                //               {
                //                 "name":"External Link",
                //                 "link":"https://www.jqueryscript.net",
                //                 "disable":false
                //               },
                //               {
                //                 "name":"Disabled Item",
                //                 "disable":true
                //               },
                //               {
                //                 "name":"-"
                //               },
                //               {
                //                 "name":"Delete Method",
                //                 "func":"delItem()"
                //               },
                //               {
                //                 "name":"Update Method",
                //                 "func":"updateItem()"
                //               },
                //               {
                //                 "name":"Add Method",
                //                 "func":"addItem()"
                //               },
                //               {
                //                 "name":"-"
                //               },
                //               {
                //                 "name":"Remove Method",
                //                 "func":"removeMenu()"
                //               },
                //               {
                //                 "name":"Close The Menu"
                //               }
                //         ],
                //         target:"_blank",
                //         beforeFunc: function (ele) {
                //             str = $(ele).text();
                //         }
                // 	});

               },
               post: function (scope, iElem, iAttrs) {
                   console.log('Dz Image Load');

               }
           }
       },
        link: function (scope, element, attrs) {
            var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                


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

                    return "//designerrrr-output.s3.amazonaws.com/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
                   
                   
                }
                        $scope.menuOptions = [

                            ["更換圖片", function () {
                                var params = {
                                    name: "dzUserGalleryPopup",
                                    directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                                };
            
                                $dazzlePopup.callPopup(params).then(function(output){
                                    var url = $scope.getFileUrl('large-web',output.gid);
//                                    $scope.model.src = url;
//                                    $scope.model.data = url;
//                                    $dazzleFn.useTemplate($scope.model);
                                        $scope.model.data = url;
                                      $element.css('background-image',"url('"+url+"')");
//                                      $dazzleFn.saveElasticAtom($scope.model.id,$scope.model,false);
                                     // $dazzleFn.saveElasticAtom()
                                },function(err){
                                    console.log('dz-image',err);
                                });
            
                            }]
                        ];

         
        }
    };
    return dzImage;
});