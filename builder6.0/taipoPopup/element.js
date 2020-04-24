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
          


        },
        controller: function ($scope, $element, $attrs) {


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

