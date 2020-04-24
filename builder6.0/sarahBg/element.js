var app = angular.module('demoApp');
app.directive('sarahBg', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/sarahBg/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/sarahBg/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                
                
                console.log('User Info',store.get('editMode'));
                
                var editMode = store.get('editMode');
                if (editMode=='admin'){
                    console.log('Edit Admin Mode');
                    $element.find('#dzContextMenu').attr('context-menu','menuOptions');
                    $compile($element.find("#dzContextMenu"))($scope);
                }
                
                // if (editMode=="normal"){
                //     $element.find('[context-menu]').attr('context-menu','');
                // }

        },
        controller: function ($scope, $element, $attrs) {
              
                 $scope.menuOptions = [

                            ["編輯背景", function () {
                                var params = {
                                    name: "dzUserGalleryPopup",
                                    directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                                };
            
                                $dazzlePopup.callPopup(params).then(function(output){
                                    var url = $scope.getFileUrl('large-web',output.gid);
                                    $element.find('#dzContextMenu').css('background-image',"url('"+url+"')");

                                },function(err){
                                    console.log('dz-image',err);
                                });
            
                            }]
                        ];

            // $scope.menuOptions = [
            //     ["編緝背景", function () {
                    
            //             var params = {
            //                 'name':'dzBlogPopup',
            //                 'blogTemplate':'blogTemplate2.html',
            //                 'images':atomInfo.atom[$scope.id]['blog'] || [],
            //                 'directive':"<dz-blog-popup></dz-blog-popup>"
            //             };
            //             $dazzlePopup.callPopup(params).then(function(images) {
            //                 //$scope.model.images = images;
            //                 console.log(images);
            //                 $scope.userGallery = images;
            //                 atomInfo.atom[$scope.id]['blog'] = images;
            //             });
    
            //         }]
            // ];
            
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            

        }
    };
    return dzLink;
});