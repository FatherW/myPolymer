var app = angular.module('demoApp');
app.directive('sarahBlog', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/sarahBlog/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/sarahBlog/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                
                
                $scope.userGallery = atomInfo.atom[id]['blog'] || [
                    
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                      'tag':'design',
                      'title':'Why you should always first',
                      'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                    },
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                      'tag':'design',
                      'title':'Why you should always first',
                      'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                    },
                    {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                      'tag':'design',
                      'title':'Why you should always first',
                      'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                    }

                ];
                atomInfo.atom[id]['blog'] = $scope.userGallery;
                
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
                ["編緝Blog", function () {
                    
                        var params = {
                            'name':'dzBlogPopup',
                            'blogTemplate':'blogTemplate2.html',
                            'images':atomInfo.atom[$scope.id]['blog'] || [],
                            'directive':"<dz-blog-popup></dz-blog-popup>"
                        };
                        $dazzlePopup.callPopup(params).then(function(images) {
                            //$scope.model.images = images;
                            console.log(images);
                            $scope.userGallery = images;
                            atomInfo.atom[$scope.id]['blog'] = images;
                        });
    
                    }]
            ];
            
            $scope.myDate = function(timestamp){
                return new Date().getTime();
            }
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            

        }
    };
    return dzLink;
});