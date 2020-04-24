var app = angular.module('demoApp');
app.directive('metalEditorPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit,$dazzleUser) {
    var name = 'metalEditorPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalEditorPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "metalEditorPopup";
            scope.type = "metalEditorPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

            var params = $dazzleUser.getDazzleInfo('params');
            var bodyEle = angular.element(params.body);
//            bodyEle.find('img').attr('context-menu','imgMenuOptions'); 
            element.find('.editor').append(bodyEle);
            element.find('.editor').find('img').attr('context-menu','imgMenuOptions');
            $compile(element.find('img'))(scope);
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var bodyEle = angular.element(params.body);

//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                
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
                    $scope.imgMenuOptions = [
        				["更換圖片", function ($itemScope,$event) {
                            console.log('My Element',$itemScope);
                        
                              var params = {
                                name: "dzUserGalleryPopup",
                                directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                            };
        
                            $dazzlePopup.callPopup(params).then(function(output){
                                var ele;
                                console.log($event.currentTarget);
                                ele = angular.element($event.currentTarget);
                                
                                ele.attr('src',$dazzleFn.getFileUrl('large-web',output.gid));
//                                $scope.model.src = $dazzleFn.getFileUrl('large-web',output.gid);
        //                        $dazzleInit.useTemplate($scope);
                            });
                        }]
    				];
// Update context menu


                    
        }
    };
    return link;
});
