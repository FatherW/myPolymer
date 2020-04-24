var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('dzCarousel', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,userInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
       // templateUrl: _cdn+"builder6.0/dzCarousel/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/dzCarousel/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
        link: function ($scope, element, attrs) {
            
            var id = element.attr('id') || new Date().getTime();
            element.attr('id',id);

            $scope.model = atomInfo.initAtom(id);
            // if (angular.isUndefined(atomInfo.atom[id]['slides']))
            //     atomInfo.atom[id]['slides']  = [
            //         {"src":"https://www.5metal.com.hk/sites/default/files/bigcold.jpg"},
            //         {"src":"https://www.5metal.com.hk/sites/default/files/styles/slide_749_208/public/MeetBanner_page.jpg?itok=UEHL17hJ"},
            //         {"src":"https://www.5metal.com.hk/sites/default/files/styles/slide_749_208/public/%E7%9B%9B%E6%B3%B0%E9%A6%96%E9%A0%81banner.JPG?itok=2G-0xlNo"}
            //     ]; 
                
  
//            $compile(element.contents())($scope);

 
            var timer = null;
            $scope.activeIndex = 0;

            $scope.jumpToSlide = function(index) {
                $scope.activeIndex = index;
                console.log($scope.activeIndex);
                // restartTimer();
            };



        },
        controller: function ($scope, $element, $attrs) {

            var id = $element.attr('id');
            
            $scope.model = atomInfo.initAtom(id);
            console.log('my Model',$scope.model);
            // atomInfo.compileAtom($element,$scope);
            // $scope.model['menuOptions'] = [id+": 編緝Slider", function () {
                    
            //             var params = {
            //                 'name':'dzGalleryPopup',
            //                 'images': $scope.model.images || [],
            //                 'directive':"<dz-gallery-popup></dz-gallery-popup>"
            //             };
            //             $dazzlePopup.callPopup(params).then(function(images) {
            //                 $scope.model.images = images;
            //                 console.log($scope.model.images);
            //                 $scope.useTemplate();
                            
            //                 $dazzleData.saveRecord($scope.model.db,images).then(function(result){
            //                         console.log('Saved');
            //                 });    
    
            //             });
    
            //         }];
            
             $scope.getFileUrl = function (size, id) {
                    if (!id) {
                        return null;
                    }

                    if (id.indexOf(".jpg")>=0) {
                        id=id.replace(".jpg","");
                    }

                    return "//designerrrr-output.s3.amazonaws.com/images/"+userInfo.exportBucket+"/"+size+"/"+id+".jpg";
                   
                   
                }
            $scope.conMenu = function($event){
                var menu =  [
                ["更換圖片", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                                console.log('My ElE',ele);
                                var params = {
                                    name: 'dzImageGalleryPopup',
                                    directive: "<dz-image-gallery-popup></dz-image-gallery-popup>"
                                };
            
                                $dazzlePopup.callPopup(params).then(function(output){
                                    var url = $scope.getFileUrl('large-web',output.gid);
                                    console.log('URL',url);
                                    ele.css("background-image","url('"+url+"')");
                                    ele.css("background-size","100%");
                                    ele.css("background-position","center center");

                                  //    ele.attr('src',url);
                                      
                                },function(err){
                                    console.log('dz-image',err);
                                });
            
                            }]
             ];
                return menu;
            }
            atomInfo.atom[id] = $scope.model;
            atomInfo.atom[id]['contextMenu'] =   ["編緝Slider", function () {

                                                    var params = {
                                                        'name':'dzGalleryPopup',
                                                        'images': atomInfo.atom[id]['slides'] || [],
                                                        'directive':"<dz-gallery-popup></dz-gallery-popup>"
                                                    };
                                                    $dazzlePopup.callPopup(params).then(function(images) {
                                                        $scope.model.slides = images;
                                                        atomInfo.atom[id] = $scope.model;
                                                        console.log($scope.model.slides);
                                                        $compile($element.contents())($scope);

                                                    });

                                                }];
            // $scope.menuOptions = [
            //     ["編緝Slider", function () {
                    
            //             var params = {
            //                 'name':'dzGalleryPopup',
            //                 'images': atomInfo.atom[id]['slides'] || [],
            //                 'directive':"<dz-gallery-popup></dz-gallery-popup>"
            //             };
            //             $dazzlePopup.callPopup(params).then(function(images) {
            //                 $scope.model.slides = images;
            //                 atomInfo.atom[id] = $scope.model;
            //                 console.log($scope.model.slides);
            //                 $compile($element.contents())($scope);
            //                 // $scope.useTemplate();
                            
            //                 // $dazzleData.saveRecord($scope.model.db,images).then(function(result){
            //                 //         console.log('Saved');
            //                 // });    
    
            //             });
    
            //         }]
            // ];
        }
    };
    return dzSlider;
});

