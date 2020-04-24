var app = angular.module('demoApp');
var _cdn = "https://d27btag9kamoke.cloudfront.net/";
app.directive('taipoSlider', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/taipoSlider/element.html?id=" + new Date().getTime(),
        css: {
          href: "https://d27btag9kamoke.cloudfront.net/builder6.0/taipoSlider/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
        link: function ($scope, element, attrs) {
            
            
    
            
            var id = element.attr('id') || new Date().getTime();
            element.attr('id',id);

            $scope.model = atomInfo.initAtom(id);
            if (angular.isUndefined(atomInfo.atom[id]['slides']))
                atomInfo.atom[id]['slides']  = [
                    {"src":"https://www.5metal.com.hk/sites/default/files/bigcold.jpg"},
                    {"src":"https://www.5metal.com.hk/sites/default/files/styles/slide_749_208/public/MeetBanner_page.jpg?itok=UEHL17hJ"},
                    {"src":"https://www.5metal.com.hk/sites/default/files/styles/slide_749_208/public/%E7%9B%9B%E6%B3%B0%E9%A6%96%E9%A0%81banner.JPG?itok=2G-0xlNo"}
                ]; 
                
            // atomInfo.getAtomJsonById(id).then(function(){
            //     console.log('My Slide Atom',atomInfo.atom[id]);
            //     $scope.model = atomInfo.atom[id];
            //     $compile(element.contents())($scope);

            // },function(err){
            //     $compile(element.contents())($scope);

            // });

            $compile(element.contents())($scope);

        

            $('.slideshow').css('width',element.attr('width'));
            $('.slideshow').css('height',element.attr('height'));
 
            var timer = null;
            $scope.activeIndex = 0;

            $scope.jumpToSlide = function(index) {
                $scope.activeIndex = index;
                console.log($scope.activeIndex);
                // restartTimer();
            };

            setInterval(function(){
                var index;
                index = $scope.activeIndex +1;
                index = index % $scope.model.slides.length;
                $scope.$apply(function(){
                    $scope.activeIndex = index;
                });
            }, 3000);


        },
        controller: function ($scope, $element, $attrs) {

            var id = $element.attr('id');
            
            $scope.model = atomInfo.initAtom(id);
            console.log('my Model',$scope.model);
            
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
            $scope.menuOptions = [
                ["編緝Slider", function () {
                    
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
                            // $scope.useTemplate();
                            
                            // $dazzleData.saveRecord($scope.model.db,images).then(function(result){
                            //         console.log('Saved');
                            // });    
    
                        });
    
                    }]
            ];
        }
    };
    return dzSlider;
});

