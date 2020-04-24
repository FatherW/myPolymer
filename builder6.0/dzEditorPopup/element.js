var app = angular.module('demoApp');
app.directive('dzEditorPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$ocLazyLoad,$dazzleUser,
dzFn,dzS3,dbFactory,userInfo,pageInfo) {
    var name = 'dzEditorPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzEditorPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            var params = $dazzleUser.getDazzleInfo('params');
            var bodyEle = angular.element(params.body);
            
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/builder6.0/dzText/element.js?id=" + new Date().getTime()).then(function () {
                element.find('.editor').append(bodyEle);
                element.find('.editor').find('img').attr('dz-image','');                
                element.find('.editor').find('img').attr('context-menu','imgMenuOptions'); 
                $compile(element.find('.editor'))(scope);
            });

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var bodyEle = angular.element(params.body);

//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                // $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                // $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                // $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                // $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                
                $scope.body = params.body;
                
                 $scope.viewHtml = function(){
                 var source;
                 source = $('.editor').html();
                   var params = {
                          'name':'metalCodePopup',
                          'directive':'<metal-code-popup></metal-code-popup>',
                          'body':source
                        };

                        $dazzlePopup.callPopup(params).then(function(result){
                            $('.editor').html(result);
                            
                             $mdToast.show(
                              $mdToast.simple()
                                .textContent('內容已更新')
                                .position('top')
                                .hideDelay(3000)
                            );
                        });    
                 
                }
                $scope.save = function(){
                    var html;
                    html = $element.find('.editor').html();
                    $mdDialog.hide(html);
                }
                $scope.cancel = function(){
                    $mdDialog.cancel();
                }
                    $scope.imgMenuOptions = [
        				["更換圖片", function ($itemScope,$event) {
                            console.log('My Element',$itemScope);
                        
                              var params = {
                                name: "dzImageGalleryPopup",
                                directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                            };
        
                            $dazzlePopup.callPopup(params).then(function(output){
                                var ele;
                                console.log($event.currentTarget);
                                ele = angular.element($event.currentTarget);
                                
                                ele.attr('src',dzFn.getFileUrl('large-web',output.gid));

                            });
                        }]
    				];
// Update context menu


                    
        }
    };
    return link;
});
