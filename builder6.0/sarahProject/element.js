var app = angular.module('demoApp');
app.directive('sarahProject', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/sarahProject/element.html?id=" + new Date().getTime(),
        css: {
          href: "https://d27btag9kamoke.cloudfront.net/builder6.0/sarahProject/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                
                
                $scope.userGallery = atomInfo.atom[id]['gallery'] || [
                    
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-6-800x1146.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-1-800x540.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-2.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-3-800x540.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-4-800x540.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-5.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-7-1280x864.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-8-800x540.jpg'},
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2016/12/portfolio-9-800x540.jpg'}
                ];
                atomInfo.atom[id]['gallery'] = $scope.userGallery;
                
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
              
                $scope.userGalleryAngularGridOptions = {
                    gridWidth: 350,
                    gutterSize: 3,
                    infiniteScrollDelay: 1000,
                    infiniteScrollDistance: 95,
                    scrollContainer: '#dialogContent_gallery'
                };

            //$dazzleInit.featherEditorInit($scope);

                
            $scope.menuOptions = [
                ["編緝Show", function () {
                    
                        var params = {
                            'name':'dzGalleryPopup',
                            'images':atomInfo.atom[$scope.id]['gallery'] || [],
                            'directive':"<dz-gallery-popup></dz-gallery-popup>"
                        };
                        $dazzlePopup.callPopup(params).then(function(images) {
                            //$scope.model.images = images;
                            console.log(images);
                            atomInfo.atom[$scope.id]['gallery'] = images;
                            $scope.userGallery = atomInfo.atom[$scope.id]['gallery'];

                        });
    
                    }]
            ];
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;

        }
    };
    return dzLink;
});